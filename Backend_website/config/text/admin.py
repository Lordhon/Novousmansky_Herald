from django.contrib import admin
from text.models import Text
@admin.register(Text)
class TextAdmin(admin.ModelAdmin):
    list_display = ("slug", "updated_at")
    search_fields = ("slug", "title")