from django.urls import path
from .views import predict_partition,get_predictions, get_prediction_detail

urlpatterns = [
    path("new", predict_partition, name="predict_partition"),
    path("predictions", get_predictions, name="prediction-list"),
    path("predictions/<int:pk>", get_prediction_detail, name="prediction-detail"),

]
