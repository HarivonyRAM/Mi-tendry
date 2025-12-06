# users/urls.py - CORRIGÉ
from django.urls import path
from . import views

urlpatterns = [
    path('auth', views.getUsers),                    # GET /api/users/
    path('auth/register', views.register),           # POST /api/users/register/
    path('auth/login', views.login),                # POST /api/users/login/
    path('auth/<int:pk>', views.getUser),           # GET /api/users/1/
    path('auth/update/<int:pk>', views.updateUser), # PUT /api/users/update/1/
    path('auth/delete/<int:pk>', views.deleteUser), # DELETE /api/users/delete/1/
]