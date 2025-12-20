from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username'] # <-- AJOUTEZ 'username' ici
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'read_only': True} # <-- Optionnel: pour ne pas obliger l'utilisateur à le fournir
        }

    def create(self, validated_data):
        email = validated_data.get("email")

        # Vérifier que l'email est unique
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Cet email est déjà utilisé."})

        # username auto basé sur l'email
        validated_data["username"] = email.split("@")[0]

        # Hash du mot de passe
        validated_data["password"] = make_password(validated_data["password"])

        # DRF peut maintenant utiliser 'username' lors de super().create()
        return super().create(validated_data)
        
    # ... méthode update inchangée ...