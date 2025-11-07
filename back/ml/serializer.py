from rest_framework import serializers

class PredictInputSerializer(serializers.Serializer):
    image_path = serializers.CharField()
