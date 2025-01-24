from rest_framework import viewsets, status
from rest_framework.response import Response
from notes.services.note_service import NoteService
from notes.models import Category, Note
from notes.serializers.note_serializer import CategorySerializer, NoteSerializer
from rest_framework.decorators import action


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    @action(detail=True, methods=["put"], url_path="update")
    def update_note(self, request, pk):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["delete"], url_path="delete")
    def destroy_note(self, request, pk):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        NoteService.delete_note(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"], url_path="create")
    def create_note(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], url_path="active")
    def list_active(self, request):
        notes = NoteService.get_active_notes()
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="inactive")
    def list_inactive(self, request):
        notes = NoteService.get_archived_notes()
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["put"], url_path="archive")
    def archive(self, request, pk=None):
        note = NoteService.get_note_by_id(pk)
        NoteService.archive_note(note)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"], url_path="add-category")
    def add_category_to_note(self, request, pk=None):
        note = self.get_object()
        category_id = request.data.get("category_id")
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )
        note.categories.add(category)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"], url_path="remove-category")
    def remove_category_from_note(self, request, pk=None):
        note = self.get_object()
        category_id = request.data.get("category_id")
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )
        note.categories.remove(category)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=["get"], url_path="category-list")
    def get_all_categories(self, request):
        categories = NoteService.get_all_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["post"], url_path="category-create")
    def create_category(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["delete"], url_path="category-delete")
    def delete_category(self, request, pk):
        NoteService.delete_category(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

