# notes/admin.py
from django.contrib import admin
from django import forms
from .models import Note, Category

class NoteAdminForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = 'title', 'content', 'is_archived'


class NoteAdmin(admin.ModelAdmin):
    form = NoteAdminForm
    list_display = ('title', 'created_at')

admin.site.register(Note, NoteAdmin)
admin.site.register(Category)
