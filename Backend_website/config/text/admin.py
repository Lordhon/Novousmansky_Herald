from django.contrib import admin
from text.models import Text
@admin.register(Text)
class TextAdmin(admin.ModelAdmin):
    list_display = ("slug", "updated_at")
    search_fields = ("slug", "title")
    def has_add_permission(self , request):
        return False


from django.contrib import admin
from django.contrib.auth.models import User, Group

admin.site.unregister(User)
admin.site.unregister(Group)

