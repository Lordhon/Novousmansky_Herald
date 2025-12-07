from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from file.models import FileModel , Category
from file.serializer import FileSerializer , CateforySerializator





class LookFileAPI(APIView):
    def get(self , request):
        files = FileModel.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LatestFilesAPI(APIView):
    def get(self, request):
        files = FileModel.objects.all().order_by('-uploaded_at')[:5]
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ListCategories(APIView):
    def get(self , request):
        categories = Category.objects.all()
        serializer = CateforySerializator(categories, many=True)
        return Response(serializer.data , status=200)


