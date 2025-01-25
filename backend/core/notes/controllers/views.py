from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from notes.models import Category, Note
from notes.services.note_service import NoteService
from notes.serializers.note_serializer import CategorySerializer, NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    lookup_field = "id"
    queryset = Note.objects.filter(is_deleted=False)
    serializer_class = NoteSerializer

    @action(detail=True, methods=["put"], url_path="update")
    def update_note(self, request, id):
        try:
            note = self.get_object()
            serializer = self.get_serializer(instance=note, data=request.data)

            if serializer.is_valid():
                validated_data = serializer.validated_data.copy()

                categories = validated_data.pop("categories", [])

                NoteService.update_note(
                    note_id=note.id, categories=categories, **validated_data
                )

                return Response(serializer.data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=["put"], url_path="delete")
    def destroy_note(self, request, id):
        try:
            NoteService.delete_note(id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=["put"], url_path="archive")
    def archive(self, request, id):
        try:
            NoteService.archive_note(id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(
        detail=True, methods=["post"], url_path="add-category/(?P<category_id>[^/.]+)"
    )
    def add_category_to_note(self, request, id, category_id):
        try:
            NoteService.add_category_to_note(id, category_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(
        detail=True,
        methods=["delete"],
        url_path="remove-category/(?P<category_id>[^/.]+)",
    )
    def remove_category_from_note(self, request, id, category_id):
        try:
            NoteService.remove_category_from_note(id, category_id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["get"], url_path="category-list")
    def get_all_categories(self, request):
        categories = NoteService.get_all_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], url_path="category-create")
    def create_category(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            NoteService.create_category(serializer.validated_data["name"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["put"], url_path="category-delete")
    def delete_category(self, request, id):
        try:
            NoteService.delete_category(id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["post"], url_path="create")
    def create_note(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            category_ids = request.data.get("categories", [])

            existing_categories = Category.objects.filter(
                id__in=category_ids, is_deleted=False
            )

            if len(existing_categories) != len(category_ids):
                invalid_ids = set(category_ids) - {
                    cat.id for cat in existing_categories
                }
                return Response(
                    {"error": f"Categories not found or deleted: {invalid_ids}"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            note = NoteService.create_note(
                title=serializer.validated_data["title"],
                content=serializer.validated_data["content"],
                categories=[cat.id for cat in existing_categories],
            )

            return Response(NoteSerializer(note).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["put"], url_path="unarchive")
    def unarchive_note(self, request, id):
        try:
            NoteService.unarchive_note(id)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
