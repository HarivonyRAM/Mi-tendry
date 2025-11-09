from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        fields = ['id', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        email = validated_data.get("email")
        validated_data["username"] = email.split("@")[0]  # username auto
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    
    def update(self, instance, validated_data):
        # Hasher le mot de passe si il est modifié
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)