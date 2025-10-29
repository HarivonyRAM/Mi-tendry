# from django.db import models
# import secrets

# # Create your models here.
# class CustomerUser(models.Model):
#     name = models.CharField(max_length=50)
#     email = models.EmailField(max_length=50)
#     password = models.CharField(max_length=50)
#     auth_token = models.CharField(max_length=64, blank=True, null=True)

#     # Generate token
#     def generate_auth_token(self):
#         self.auth_token = secrets.token_hex(32)
#         self.save()
#         return self.auth_token

#     def __str__(self):
#         return self.name

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Créer un token automatiquement quand un user est créé
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)