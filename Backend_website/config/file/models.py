from django.db import models      
import uuid                       
import os                         
from datetime import datetime  


class Category(models.Model):
    name = models.CharField(max_length=255 ,  verbose_name="Название")
    def __str__(self):
        return self.name
    class Meta: 
        verbose_name = "Типы документов"



class FileModel(models.Model):
  
    title = models.TextField(verbose_name="Название")
    category = models.ForeignKey(Category, on_delete=models.CASCADE , verbose_name="Категория")
    uploaded_at = models.DateField(verbose_name="Дата загрузки")

    def __str__(self):
        
        return self.title
    class Meta: 
        verbose_name = "Документ"



def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    now = datetime.now()
    year = now.strftime("%Y")
    month = now.strftime("%m")
    day = now.strftime("%d")
    return os.path.join('documents', year, month, day, new_filename)


class FileItem(models.Model):
    parent = models.ForeignKey(FileModel,on_delete=models.CASCADE,  related_name='files' , verbose_name="Документ")    
    file = models.FileField(upload_to=upload_to , verbose_name="Файл")
    context = models.CharField(verbose_name="Описание")
    uploaded_at = models.DateTimeField(auto_now_add=True , verbose_name="Дата загрузки")
    format = models.CharField(max_length=20, blank=True , verbose_name="Формат")
    def save(self, *args, **kwargs):
        if not self.format:
            self.format = self.file.name.split('.')[-1].lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.file.name
    class Meta:
        verbose_name = "Файл"
        
