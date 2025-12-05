
from rest_framework import serializers
from file.models import FileModel


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = ['id' , 'file' , 'title' , 'category' , 'uploaded_at']
        read_only_fields = ['uploaded_at']