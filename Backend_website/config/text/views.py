from django.shortcuts import render

from rest_framework import generics, permissions
from text.models import Text
from .serializer import TextSerializer

class ContentBlockDetail(generics.RetrieveAPIView):
    queryset = Text.objects.all()
    lookup_field = "slug"
    serializer_class = TextSerializer

class ContentBlockList(generics.ListAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
