import cv2
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd
import os
import matplotlib.pyplot as plt

# === Charger le modèle ===
model_path = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/Nouveau_modele/V3/model_checkpoint_v3.keras"
model = load_model(model_path)
print("✅ Modèle chargé :", model_path)

# === Charger les labels nettoyés depuis mapping ===
labels_path = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/ml/mapping_208_classes.txt"
with open(labels_path, "r", encoding="utf-8") as f:
    CLASSES = []
    for line in f:
        parts = line.strip().split()
        if len(parts) > 1:
            line = parts[-1]
        CLASSES.append(line)
print(f"📚 {len(CLASSES)} classes chargées.")

# === Charger l'image à tester ===
img_path = "/home/tellar/Documents/DEV/Projets_Scolaires/GRAND PROJET M2/PROJET/mi-tendry-project/back/test_set_image/test2.png"
img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
if img is None:
    raise ValueError(f"❌ Impossible de lire l'image : {img_path}")

# === Prétraitement comme à l'entraînement ===
IMG_SIZE = 256
img_resized = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
img_norm = img_resized / 255.0
img_input = np.expand_dims(img_norm, axis=(0, -1))  # (1, 256, 256, 1)

# === Prédiction ===
preds = model.predict(img_input, verbose=0)
probas = preds[0]
print(f"Prédiction brute :\n{probas}")

# === Détection selon un seuil (ex: 0.5) ===
threshold = 0.5
detected_classes = [CLASSES[i] for i, p in enumerate(probas) if p >= threshold]
print("\n🎵 Classes détectées avec proba >= 0.5 :")
print(detected_classes if detected_classes else "Aucune classe détectée.")

# === Trier toutes les classes par probabilité décroissante ===
sorted_idx = np.argsort(probas)[::-1]
sorted_classes = [CLASSES[i] for i in sorted_idx]
sorted_values = probas[sorted_idx]

# === Garder le Top 20 ===
top_n = 20
top_classes = sorted_classes[:top_n]
top_values = sorted_values[:top_n]

# === Sauvegarder le Top 20 dans un CSV ===
results_df = pd.DataFrame({
    "classe": top_classes,
    "probabilité": top_values
})
save_csv_path = "back/ml/resultat/amazing_predictions_top20.csv"
os.makedirs(os.path.dirname(save_csv_path), exist_ok=True)
results_df.to_csv(save_csv_path, index=False, encoding="utf-8-sig")
print(f"💾 Top 20 résultats sauvegardés sous : {save_csv_path}")
print(results_df)

# === Afficher l'image (optionnel) ===
plt.imshow(img_resized, cmap='gray')
plt.title("Partition test - Image prétraitée")