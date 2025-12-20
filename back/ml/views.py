import os
import cv2
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model

# LIGNE CORRIGÉE : Importation des décorateurs nécessaires pour l'authentification et les permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes 
from rest_framework.response import Response
from rest_framework import status

# Importations JWT nécessaires pour l'authentification
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializer import PredictInputSerializer
from .serializer import PredictionResultSerializer
from .models import PredictionResult


# === CONFIGURATIONS ===
MODEL_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/Nouveau_modele/V3/model_checkpoint_v3.keras"
LABELS_PATH = "/home/tellar/Documents/DEV/Mi-tendry/back/ml/mapping_208_classes.txt"

# === CHARGER LE MODÈLE EN MÉMOIRE ===
print("📦 Chargement du modèle en mémoire...")
try:
    model = load_model(MODEL_PATH, compile=False)
    print(f"✅ Modèle chargé : {MODEL_PATH}")
except Exception as e:
    print(f"❌ ERREUR lors du chargement du modèle : {e}")
    model = None # Pour éviter des erreurs si le serveur continue
    
# === CHARGER LES CLASSES ===
CLASSES = []
try:
    with open(LABELS_PATH, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split()
            if len(parts) > 1:
                line = parts[-1]
            CLASSES.append(line)
    print(f"📚 {len(CLASSES)} classes chargées depuis {LABELS_PATH}")
except Exception as e:
    print(f"❌ ERREUR lors du chargement des classes : {e}")


# === API DE PRÉDICTION ===
@api_view(["POST"])
@authentication_classes([JWTAuthentication]) # Assure l'utilisation du token JWT
@permission_classes([IsAuthenticated])     # Exige que l'utilisateur soit connecté
def predict_partition(request):

    if model is None:
         return Response({"error": "Modèle ML non chargé. Vérifiez la configuration du chemin."}, 
                         status=status.HTTP_503_SERVICE_UNAVAILABLE)
                         
    # ✅ Validation avec serializer DRF
    serializer = PredictInputSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    image_path = serializer.validated_data["image_path"]

    if not os.path.exists(image_path):
        return Response({"error": f"Image introuvable : {image_path}"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # === Prétraitement image ===
        IMG_SIZE = 256
        # Utilisation de cv2.IMREAD_COLOR puis conversion en niveaux de gris pour robustesse
        img = cv2.imread(image_path)
        if img is None:
            return Response({"error": "Impossible de lire l'image"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Convertir en niveaux de gris et redimensionner
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img_resized = cv2.resize(img_gray, (IMG_SIZE, IMG_SIZE))
        
        # Normalisation et préparation pour le modèle (ajusté pour un modèle Keras mono-canal)
        img_norm = img_resized.astype('float32') / 255.0
        # Ajout des dimensions de lot (0) et de canal (dernier)
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
        # Gérer le cas où il y a moins de 20 classes
        top_n_actual = min(top_n, len(CLASSES))
        top_classes = [CLASSES[i] for i in sorted_idx[:top_n_actual]]
        top_values = probas[sorted_idx[:top_n_actual]]

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
        # Renvoie une erreur 500 avec le message de l'exception
        return Response({"error": f"Erreur lors de la prédiction: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API récupération des prédictions (protégée par JWT par souci de cohérence)
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_predictions(request):
    predictions = PredictionResult.objects.all().order_by("-created_at")
    serializer = PredictionResultSerializer(predictions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Récupération d'une seule prédiction (protégée par JWT)
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_prediction_detail(request, pk):
    try:
        prediction = PredictionResult.objects.get(pk=pk)
    except PredictionResult.DoesNotExist:
        return Response({"error": "Prediction not found"}, status=status.HTTP_404_NOT_FOUND) # Utilisation de status.HTTP_404_NOT_FOUND

    serializer = PredictionResultSerializer(prediction)
    return Response(serializer.data)