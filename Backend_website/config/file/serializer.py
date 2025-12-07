
from rest_framework import serializers
from file.models import FileModel , FileItem , Category
class FileItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileItem
        fields = ['id', 'file', 'format' ,'context']


class FileSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    files = FileItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = FileModel
        fields = ['id'  ,'title' , 'category' , 'uploaded_at' , 'files' ]

class CateforySerializator(serializers.ModelSerializer):
    class Meta:
        model=  Category
        fields = ['name',]
        
