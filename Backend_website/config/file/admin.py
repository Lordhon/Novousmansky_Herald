from django.contrib import admin
from .models import Category, FileModel, FileItem



class FileItemInline(admin.TabularInline):
    model = FileItem
    extra = 1  
    fields = ['file']  
    verbose_name = "Файл"
    verbose_name_plural = "Файлы"



@admin.register(FileModel)
class FileModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'category') 
    inlines = [FileItemInline]           



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(FileItem)
class FileItemAdmin(admin.ModelAdmin):
    list_display = ('parent', 'file', 'uploaded_at', 'format')