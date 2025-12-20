from django.db import models

class PredictionResult(models.Model):
    image_name = models.CharField(max_length=255)
    detected_classes = models.JSONField()
    top_20 = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for {self.image_name} at {self.created_at}"
