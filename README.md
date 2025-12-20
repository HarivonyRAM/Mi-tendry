# Mi-tendry
GP M2


# ===============================
# Windows
# ===============================

# 1. Créer un environnement virtuel nommé "env"
`python -m venv env`

# 2. Activer l'environnement virtuel
`env\Scripts\activate`

# 3. (Optionnel) Vérifier que l'environnement est activé
`where python`

# 4. Installation des dépendances:

## Pour projet
`pip install -r requirements.txt`

## Pour la production
`pip install -r requirements_prod.txt`

# 5. Vérification de l'environnement utilisé
`which python`
`which django-admin`

# ===============================
# Linux/Ubuntu
# ===============================

# 1. Installation de virtualenv pour la création de l'environnement virtualenv
`sudo apt update`
`sudo apt install python3-virtualenv`

# 2. Création de l'environnement et activation
`virtualenv env`
`source env/bin/activate`

# 3. Installation des dépendances:

## Pour projet
`pip install -r requirements.txt`

## Pour la production
`pip install -r requirements_prod.txt`

# 4. Vérification de l'environnement utilisé
`which python`
`which django-admin`

# ===============================
# Création projet django+PostgreSQL
# ===============================

# 1. Création du projet
`django-admin startproject nomProjet .`

# 2. Setup environnement de la base de donnée dans settings.py

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "nom_base_de_donnée",
        "USER": "nom_utilisateur",
        "PASSWORD": "mot_de_passe_postgre",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

# 3. Création de superuser
`python manage.py createsuperuser`

# 3. Test de lancement du serveur
`python manage.py runserver`