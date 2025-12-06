from django.apps import AppConfig


class TextConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'text'
    verbose_name = 'Текст на страницах . Пример /about'
