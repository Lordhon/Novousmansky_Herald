from django.contrib import admin
from .models import Category, FileModel, FileItem


admin.site.site_header = "Панель администратора"
admin.site.site_title = "Панель администратора"
admin.site.index_title = "Добро пожаловать в админ-панель"

class FileItemInline(admin.TabularInline):
    model = FileItem
    extra = 1  
    fields = ['file', 'context']  
    verbose_name = "Файл"
    verbose_name_plural = "Файлы"


@admin.register(FileModel)
class FileModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'uploaded_at') 
    list_filter = ('category', 'uploaded_at') 
    search_fields = ('title', 'category__name')
    inlines = [FileItemInline]
    



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)