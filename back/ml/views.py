import os
import cv2
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializer import PredictInputSerializer
from .serializer import PredictionResultSerializer
from .models import PredictionResult


# === CONFIGURATIONS ===
MODEL_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/Nouveau_modele/V3/model_checkpoint_v3.keras"
LABELS_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/mapping_208_classes.txt"

# === CHARGER LE MODÈLE EN MÉMOIRE ===
print("📦 Chargement du modèle en mémoire...")
model = load_model(MODEL_PATH, compile=False)
print(f"✅ Modèle chargé : {MODEL_PATH}")

# === CHARGER LES CLASSES ===
CLASSES = []
with open(LABELS_PATH, "r", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) > 1:
            line = parts[-1]
        CLASSES.append(line)
print(f"📚 {len(CLASSES)} classes chargées depuis {LABELS_PATH}")


# === API DE PRÉDICTION ===
@api_view(["POST"])
def predict_partition(request):

    # ✅ Validation avec serializer DRF
    serializer = PredictInputSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    image_path = serializer.validated_data["image_path"]

    if not os.path.exists(image_path):
        return Response({"error": "Image introuvable"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # === Prétraitement image ===
        IMG_SIZE = 256
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return Response({"error": "Impossible de lire l'image"}, status=status.HTTP_400_BAD_REQUEST)

        img_resized = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        img_norm = img_resized / 255.0
        img_input = np.expand_dims(img_norm, axis=(0, -1))

        # === Prédiction ===
        preds = model.predict(img_input, verbose=0)
        probas = preds[0].astype(float)

        # === Classes détectées par seuil ===
        threshold = 0.5
        detected_classes = [
            CLASSES[i] for i, p in enumerate(probas) if p >= threshold
        ]

        # === Top 20 triés ===
        sorted_idx = np.argsort(probas)[::-1]
        top_n = 20
        top_classes = [CLASSES[i] for i in sorted_idx[:top_n]]
        top_values = probas[sorted_idx[:top_n]]

        top_20_list = [
            {"classe": cls, "probabilite": float(val)}
            for cls, val in zip(top_classes, top_values)
        ]

        # ✅ Sauvegarde DB PostgreSQL
        PredictionResult.objects.create(
            image_name=os.path.basename(image_path),
            detected_classes=detected_classes if detected_classes else [],
            top_20=top_20_list
        )

        # ✅ Retour API
        return Response({
            "message": "✅ Prédiction réussie",
            "image": os.path.basename(image_path),
            "classes_detectees": detected_classes,
            "top_20": top_20_list,
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API récupération des prédictions
@api_view(["GET"])
def get_predictions(request):
    predictions = PredictionResult.objects.all().order_by("-created_at")
    serializer = PredictionResultSerializer(predictions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Récupération d'une seule prédiction
@api_view(["GET"])
def get_prediction_detail(request, pk):
    try:
        prediction = PredictionResult.objects.get(pk=pk)
    except PredictionResult.DoesNotExist:
        return Response({"error": "Prediction not found"}, status=404)

    serializer = PredictionResultSerializer(prediction)
    return Response(serializer.data)
