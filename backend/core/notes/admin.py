
from django.contrib import admin
from notes.models import Note, Category

class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'content')

admin.site.register(Note, NoteAdmin)
admin.site.register(Category)
