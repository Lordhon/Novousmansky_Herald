from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from file.models import FileModel , Category
from file.serializer import FileSerializer , CateforySerializator
import requests




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


class SendBack(APIView):
    def post(self, request):
        name = request.data.get('name')
        sms = request.data.get('sms')
        email = request.data.get('email')
        phone = request.data.get('phone')
        captcha_token = request.data.get('captcha')

        if not name:
            return Response({"error": "Необходимо указать имя"}, status=status.HTTP_400_BAD_REQUEST)
        if not sms:
            return Response({"error": "Необходимо указать сообщение"}, status=status.HTTP_400_BAD_REQUEST)
        if not (email or phone):
            return Response({"error": "Необходимо указать хотя бы Email или телефон"}, status=status.HTTP_400_BAD_REQUEST)
        if not captcha_token:
            return Response({"error": "Не пройдена проверка reCAPTCHA"}, status=status.HTTP_400_BAD_REQUEST)

       
        secret_key = settings.RECAPTCHA_SECRET_KEY
        verify_url = "https://www.google.com/recaptcha/api/siteverify"

        try:
            response = requests.post(verify_url, data={"secret": secret_key, "response": captcha_token})
            result = response.json()
        except Exception as e:
           
            return Response({"error": "Ошибка проверки reCAPTCHA"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not result.get("success"):
            error_codes = result.get("error-codes", [])
            return Response({"error": f"Ошибка проверки reCAPTCHA: {error_codes}"}, status=status.HTTP_400_BAD_REQUEST)

      
        subject = "Новое сообщение"
        message = f"Имя: {name}\nТелефон: {phone}\nEmail: {email}\nСообщение: {sms}"
        recipient_list = ["zevs@zevszvl.ru"]

        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list, fail_silently=False)
            return Response({"success": "Письмо отправлено"}, status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"error": "Ошибка отправки письма"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
