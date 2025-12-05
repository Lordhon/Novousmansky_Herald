from django.db import models      
import uuid                       
import os                         
from datetime import datetime  


class Category(models.Model):
   
    name = models.CharField(max_length=255)

    def __str__(self):

        return self.name



class FileModel(models.Model):
  
    title = models.CharField(max_length=120)

   
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        
        return self.title



def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    now = datetime.now()
    year = now.strftime("%Y")
    month = now.strftime("%m")
    day = now.strftime("%d")
    return os.path.join('documents', year, month, day, new_filename)


class FileItem(models.Model):
    parent = models.ForeignKey(FileModel,on_delete=models.CASCADE,  related_name='files'        )
    file = models.FileField(upload_to=upload_to)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    format = models.CharField(max_length=20, blank=True)
    def save(self, *args, **kwargs):
        if not self.format:
            self.format = self.file.name.split('.')[-1].lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.file.name
