"""
Django settings for django_settings project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from os import environ
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-((s3uqx#qargwc%=heex2yfvpf!@*3*2c5)6u)aybcdbd)bj-8"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    *environ.get("ALLOWED_HOSTS", "*").split("|"),
]

# CORS
CORS_ALLOW_ALL_ORIGINS = environ.get("CORS_ALLOW_ALL_ORIGINS", "false").lower() == "true"
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    *environ.get("ALLOWED_ORIGINS_FE", "http://127.0.0.1:4200|http://localhost:4200").split("|"),
    *environ.get("ALLOWED_ORIGINS_BE", "http://127.0.0.1:8000|http://localhost:8000").split("|"),
]

CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = "CSRF_COOKIE"
CSRF_TRUSTED_ORIGINS = [
    *environ.get("ALLOWED_ORIGINS_FE", "http://127.0.0.1:4200|http://localhost:4200").split("|"),
    *environ.get("ALLOWED_ORIGINS_BE", "http://127.0.0.1:8000|http://localhost:8000").split("|"),
]

SESSION_COOKIE_SECURE = environ.get("SESSION_COOKIE_SECURE", "false").lower() == "true"
CSRF_COOKIE_SECURE = SESSION_COOKIE_SECURE
CSRF_COOKIE_HTTPONLY = False
if CSRF_COOKIE_SECURE:
    CSRF_COOKIE_SAMESITE = None
else:
    CSRF_COOKIE_SAMESITE = "Lax"

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    'corsheaders',
    "django_filters",
    "rest_framework",
    "django_countries",
    "drf_spectacular",

    "src.backend.account",
    "src.backend.airport",
    "src.backend.flight",
    "src.backend.payment",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = "django_settings.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "django_settings.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = 'account.User'

# Add these settings for drf-spectacular
SPECTACULAR_SETTINGS = {
    'TITLE': 'Skylink backend API',
    'DESCRIPTION': 'API for Skylink backend, including authentication and authorization.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_SETTINGS': {
        'persistAuthorization': True,
    },
}

REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated',
    # ],
    
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day'
    },
    
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ],
    
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
    
    'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S%z',
    'DATE_FORMAT': '%Y-%m-%d',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Skylink backend API',
    'DESCRIPTION': 'API for Skylink backend, including authentication and authorization.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_SETTINGS': {
        'persistAuthorization': True,
    },
    
    'SECURITY': [
        {
            'Bearer': {
                'type': 'apiKey',
                'name': 'Authorization',
                'in': 'header'
            }
        }
    ],
    'SERVERS': [
        {'url': 'http://localhost:8000', 'description': 'Local Development Server'},
    ],
    'TAGS': [
        {'name': 'Authentication', 'description': 'Authentication endpoints'},
        {'name': 'Users', 'description': 'User management endpoints'},
        {'name': 'Addresses', 'description': 'Address management endpoints'},
        {'name': 'Airports', 'description': 'Airport management endpoints'},
        {'name': 'Gates', 'description': 'Gate management endpoints'},
        {'name': 'Airlines', 'description': 'Airline management endpoints'},
        {'name': 'Flights', 'description': 'Flight management endpoints'},
        {'name': 'Seats', 'description': 'Seat management endpoints'},
        {'name': 'Reservations', 'description': 'Reservation management endpoints'},
        {'name': 'Baggage', 'description': 'Baggage management endpoints'},
    ],
    'COMPONENT_SPLIT_REQUEST': True,
    'SCHEMA_PATH_PREFIX': '/api/',
}

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from drf_spectacular.extensions import OpenApiAuthenticationExtension

SPECTACULAR_SETTINGS = {
    'TITLE': 'Your API',
    'DESCRIPTION': 'Your API description',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SECURITY': [{'sessionAuth': []}],
    'COMPONENT_SPLIT_REQUEST': True,
    'AUTHENTICATION_WHITELIST': ['rest_framework.authentication.SessionAuthentication'],
}

