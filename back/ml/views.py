import numpy as np
import cv2
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tensorflow.keras.models import load_model

MODEL_PATH = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/Mi-tendry/back/ml/Nouveau_modele/V3/model_checkpoint_v3.keras"

@csrf_exempt
def predict_partition(request):
    if request.method != "POST":
        return JsonResponse({"error": "Méthode non autorisée"}, status=405)

    try:
        data = json.loads(request.body)
        image_path = data.get("image_path")

        if not image_path or not os.path.exists(image_path):
            return JsonResponse({"error": "Image introuvable"}, status=400)

        # Charger le modèle (CPU)
        model = load_model(MODEL_PATH, compile=False)

        # Lire et prétraiter l’image
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (256, 256)) / 255.0
        img_input = np.expand_dims(img, axis=(0, -1))

        preds = model.predict(img_input)
        preds_list = preds.tolist()

        return JsonResponse({
            "message": "✅ Prédiction réussie",
            "shape": str(preds.shape),
            "predictions": preds_list
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
