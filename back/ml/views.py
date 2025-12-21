import cv2
import numpy as np
import os

from tensorflow.keras.models import load_model

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    parser_classes,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializer import PredictInputSerializer, PredictionResultSerializer
from .models import PredictionResult


# ============================================================
# CONFIGURATIONS
# ============================================================

MODEL_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/Nouveau_modele/V3/model_checkpoint_v3.keras"
LABELS_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/mapping_208_classes.txt"
IMG_SIZE = 256


# ============================================================
# CHARGEMENT DU MODÈLE
# ============================================================

print("📦 Chargement du modèle ML...")
try:
    model = load_model(MODEL_PATH, compile=False)
    print("✅ Modèle chargé avec succès")
except Exception as e:
    print(f"❌ ERREUR chargement modèle : {e}")
    model = None


# ============================================================
# CHARGEMENT DES CLASSES
# ============================================================

CLASSES = []
try:
    with open(LABELS_PATH, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            CLASSES.append(parts[-1])
    print(f"📚 {len(CLASSES)} classes chargées")
except Exception as e:
    print(f"❌ ERREUR chargement classes : {e}")


# ============================================================
# API : PRÉDICTION
# ============================================================

@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def predict_partition(request):

    if model is None:
        return Response(
            {"error": "Modèle ML non chargé"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    # =======================
    # VALIDATION INPUT
    # =======================
    serializer = PredictInputSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    uploaded_file = serializer.validated_data["file"]
    image_type = serializer.validated_data["type"]  # utilisable plus tard si besoin

    # =======================
    # LECTURE IMAGE (EN MÉMOIRE)
    # =======================
    try:
        file_bytes = np.frombuffer(uploaded_file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    except Exception as e:
        return Response(
            {"error": f"Erreur lecture image : {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if img is None:
        return Response(
            {"error": "Image invalide ou non supportée"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # =======================
    # PRÉTRAITEMENT
    # =======================
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_resized = cv2.resize(img_gray, (IMG_SIZE, IMG_SIZE))
    img_norm = img_resized.astype("float32") / 255.0
    img_input = np.expand_dims(img_norm, axis=(0, -1))

    # =======================
    # PRÉDICTION
    # =======================
    preds = model.predict(img_input, verbose=0)[0].astype(float)

    threshold = 0.5
    detected_classes = [
        CLASSES[i] for i, p in enumerate(preds) if p >= threshold
    ]

    sorted_idx = np.argsort(preds)[::-1][:20]
    top_20 = [
        {
            "classe": CLASSES[i],
            "probabilite": float(preds[i]),
        }
        for i in sorted_idx
    ]

    # =======================
    # SAUVEGARDE EN BASE
    # =======================
    PredictionResult.objects.create(
        image_name=uploaded_file.name,
        detected_classes=detected_classes,
        top_20=top_20,
    )

    # =======================
    # RÉPONSE API
    # =======================
    return Response(
        {
            "message": "✅ Prédiction réussie",
            "image": uploaded_file.name,
            "classes_detectees": detected_classes,
            "top_20": top_20,
        },
        status=status.HTTP_200_OK,
    )


# ============================================================
# API : LISTE DES PRÉDICTIONS
# ============================================================

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_predictions(request):
    predictions = PredictionResult.objects.all().order_by("-created_at")
    serializer = PredictionResultSerializer(predictions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ============================================================
# API : DÉTAIL PRÉDICTION
# ============================================================

@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_prediction_detail(request, pk):
    try:
        prediction = PredictionResult.objects.get(pk=pk)
    except PredictionResult.DoesNotExist:
        return Response(
            {"error": "Prediction not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = PredictionResultSerializer(prediction)
    return Response(serializer.data, status=status.HTTP_200_OK)
