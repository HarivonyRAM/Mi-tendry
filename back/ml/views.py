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



#######################################
import os
import cv2
import json
import numpy as np
import pandas as pd
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tensorflow.keras.models import load_model

# === CONFIGURATIONS ===
MODEL_PATH = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/Mi-tendry/back/ml/Nouveau_modele/V3/model_checkpoint_v3.keras"
LABELS_PATH = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/Mi-tendry/back/ml/mapping_208_classes.txt"
SAVE_RESULTS_PATH = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/Mi-tendry/back/ml/resultat/amazing_predictions_top20.csv"

# === CHARGER LE MODÈLE UNE SEULE FOIS ===
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

# === FONCTION DJANGO ===
@csrf_exempt
def predict_partition(request):
    if request.method != "POST":
        return JsonResponse({"error": "Méthode non autorisée"}, status=405)

    try:
        # --- Lecture des données reçues ---
        data = json.loads(request.body)
        image_path = data.get("image_path")

        if not image_path or not os.path.exists(image_path):
            return JsonResponse({"error": "Image introuvable"}, status=400)

        # --- Prétraitement de l'image ---
        IMG_SIZE = 256
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return JsonResponse({"error": "Impossible de lire l'image"}, status=400)

        img_resized = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        img_norm = img_resized / 255.0
        img_input = np.expand_dims(img_norm, axis=(0, -1))  # (1, 256, 256, 1)

        # --- Prédiction ---
        preds = model.predict(img_input, verbose=0)
        probas = preds[0].astype(float)

        # --- Détection selon seuil ---
        threshold = 0.5
        detected_classes = [
            CLASSES[i] for i, p in enumerate(probas) if p >= threshold
        ]

        # --- Tri des classes par probabilité décroissante ---
        sorted_idx = np.argsort(probas)[::-1]
        sorted_classes = [CLASSES[i] for i in sorted_idx]
        sorted_values = probas[sorted_idx]

        # --- Top 20 ---
        top_n = 20
        top_classes = sorted_classes[:top_n]
        top_values = sorted_values[:top_n]

        # --- Sauvegarde CSV ---
        results_df = pd.DataFrame({
            "classe": top_classes,
            "probabilite": top_values
        })
        os.makedirs(os.path.dirname(SAVE_RESULTS_PATH), exist_ok=True)
        results_df.to_csv(SAVE_RESULTS_PATH, index=False, encoding="utf-8-sig")

        print(f"💾 Top 20 sauvegardés : {SAVE_RESULTS_PATH}")

        # --- Réponse JSON ---
        return JsonResponse({
            "message": "✅ Prédiction réussie",
            "image": os.path.basename(image_path),
            "classes_detectees": detected_classes if detected_classes else [],
            "top_20": results_df.to_dict(orient="records"),
            "fichier_resultat": SAVE_RESULTS_PATH
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
