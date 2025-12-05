from django.db import models
from ckeditor.fields import RichTextField


class Text(models.Model):
    slug = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200, blank=True)
    content = RichTextField(blank=True)  
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.slug

