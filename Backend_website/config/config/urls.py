from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from file.views import  LookFileAPI, LatestFilesAPI , ListCategories ,SendBack
from text.views import ContentBlockList , ContentBlockDetail

from Useradmin.views import ResetPassword, admin_reset_page

urlpatterns = [
    path('admin/simple-reset/', admin_reset_page, name='admin_reset_page'),
    path('admin/api/reset-password/', ResetPassword.as_view()),

    path('admin/', admin.site.urls),

    path('api/look-file/', LookFileAPI.as_view()),
    path('api/latest-files/', LatestFilesAPI.as_view()),
    path("api/content/", ContentBlockList.as_view()),
    path("api/content/<slug:slug>/", ContentBlockDetail.as_view()),
    path("api/list-categories/", ListCategories.as_view()),
    path("api/SendBack/", SendBack.as_view()),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
