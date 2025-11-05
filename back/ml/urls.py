from django.urls import path
from .views import predict_partition

urlpatterns = [
    path("predict/", predict_partition, name="predict_partition"),
]
