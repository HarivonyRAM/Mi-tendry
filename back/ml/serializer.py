from rest_framework import serializers
from .models import PredictionResult

class PredictInputSerializer(serializers.Serializer):
    image_path = serializers.CharField()

class PredictionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionResult
        fields = "__all__"
