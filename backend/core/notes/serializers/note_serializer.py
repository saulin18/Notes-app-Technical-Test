from rest_framework import serializers
from notes.models import Note, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class NoteSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ['uuid', 'id', 'title', 'content', 'is_archived', 'categories']
        
        