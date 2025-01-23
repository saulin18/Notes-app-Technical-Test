from rest_framework import viewsets, status
from rest_framework.response import Response
from notes.services.note_service import NoteService
from notes.models import Category, Note
from notes.serializers.note_serializer import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list_active(self, request):
        notes = NoteService.get_active_notes()
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

    def archive(self, request, pk):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        NoteService.archive_note(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def list_inactive(self, request):
        notes = NoteService.get_archived_notes()
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)
    
    def create_note(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy_note(self, request, pk):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        NoteService.delete_note(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
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
    
    def add_category(self, request, pk):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def remove_category(self, request, pk, category_id):
        try:
            NoteService.get_note_by_id(pk)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            NoteService.get_category_by_id(category_id)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        NoteService.remove_category(pk, category_id)
        return Response(status=status.HTTP_204_NO_CONTENT)