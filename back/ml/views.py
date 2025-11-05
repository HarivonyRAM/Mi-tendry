# app/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .predict import predict_music_symbols
import os

def upload_and_predict(request):
    if request.method == "POST" and request.FILES.get("image"):
        image = request.FILES["image"]
        image_path = f"media/{image.name}"

        # Sauvegarde du fichier temporairement
        os.makedirs("media", exist_ok=True)
        with open(image_path, "wb+") as dest:
            for chunk in image.chunks():
                dest.write(chunk)

        # Appeler la fonction de prédiction
        result = predict_music_symbols(image_path)
        return JsonResponse(result)

    return render(request, "upload.html")


