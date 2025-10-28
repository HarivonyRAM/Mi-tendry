from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'roles','is_active', 'is_staff', 'is_superuser', 'is_investor', 'is_entrepreneur']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'is_active': {'read_only': True},
            'is_staff': {'read_only': False},
            'is_superuser': {'read_only': False},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        user.save()
        return user
    
    """ def get_roles(self, obj):
        if obj.is_investor:
            return ['Investor']
        elif obj.is_entrepreneur:
            return ['Entrepreneur']
        elif obj.is_investor and obj.is_entrepreneur:
            return ['Investor', 'Entrepreneur'] """
        