from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.getUsers),
    path('users/create/', views.addUser),
    path('users/login/', views.login),
    path('users/<int:pk>/', views.getUser),
    path('users/update/<int:pk>/', views.updateUser),
    path('users/delete/<int:pk>/', views.deleteUser),
]