from rest_framework import serializers
from notes.models import Note, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [ 'id', 'name', 'is_deleted']


class NoteSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all(),
        required=False 
    )

    class Meta:
        model = Note
        fields = [ 'id','title', 'content', 'is_archived', 'categories', 'created_at', 'is_deleted']