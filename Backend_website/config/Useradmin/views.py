import secrets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class ResetPassword(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email обязателен'}, status=400)

        try:
            user = User.objects.get(username=email)
        except User.DoesNotExist:
            return Response({'error': 'Пользователь не найден'}, status=404)

        new_password = secrets.token_urlsafe(8)
        user.set_password(new_password)
        user.save()

        send_mail(
            'Восстановление пароля (Admin)',
            f'Ваш новый пароль: {new_password}',
            None,
            [email],
        )

        return Response({'message': 'Новый пароль отправлен на почту'})


def admin_reset_page(request):
    
    return render(request, 'admin/reset_password.html')