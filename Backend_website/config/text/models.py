from django.db import models
from ckeditor.fields import RichTextField


class Text(models.Model):
    slug = models.CharField(max_length=100, unique=True , verbose_name='Ссылка на которой менять . Пример about')
    content = RichTextField(blank=True )  
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name = "Текст для странички"
        verbose_name_plural = "Тексты для страничек"

