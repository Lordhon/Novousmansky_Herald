import os
import sys
from datetime import timedelta
from pathlib import Path
import warnings
from django.utils.deprecation import RemovedInDjango60Warning

BASE_DIR = Path(__file__).resolve().parent.parent


RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")
PASSWORD_DB = os.getenv("PASSWORD_DB")
SECRET_KEY = os.getenv("SECRET_KEY")
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'backend', 'zakaz_backend', '0.0.0.0' , '192.168.61.210' , 'nv36.ru']

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "stream": sys.stdout,
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "INFO",
            "propagate": True,
        },

        "users": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'ckeditor',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework_simplejwt',
    'rest_framework',
    'Useradmin',
    'file',
    'text',

]

warnings.filterwarnings(
    "ignore",
    message="django-ckeditor bundles CKEditor 4",
)
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_ALLOW_NONIMAGE_FILES = False
CKEDITOR_CONFIGS = {
    'default': {
        'removePlugins': 'exportpdf',
        'toolbar': 'full',
        'contentsCss': ['/static/ckeditor_custom.css'],
        'customConfig': '/static/ckeditor_source_fix.js',
        'height': 300,
        'width': '100%',
        'removeButtons' : 'Save,Scayt,NewPage,Preview,Print,Templates,PasteFromWord,PasteText,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Flash,Iframe,Maximize,ShowBlocks,About'
    },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.mail.ru'
EMAIL_PORT = 465
EMAIL_HOST_USER = 'site@nv36.ru' 
EMAIL_USE_SSL = True
EMAIL_HOST_PASSWORD = 'qytdvr14I6fSqees0XLr'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER








MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'





DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Novousmansky_vestnik',
        'USER': os.getenv("POSTGRES_USER"),
        'PASSWORD' : PASSWORD_DB,
        'HOST':'db',
        'port':'5432',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    
    ),


}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]




LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://frontend:80",
    "http://zakaz_frontend:80",
    "https://nv36.ru",
    "http://localhost:8080",

]
CSRF_TRUSTED_ORIGINS = ['https://nv36.ru' , 'http://localhost:8080']