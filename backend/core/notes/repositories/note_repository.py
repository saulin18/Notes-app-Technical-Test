from django.core.exceptions import ObjectDoesNotExist
from notes.models import Note, Category

class NoteRepository:
    @staticmethod
    def get_note_by_id(note_id: int) -> Note:
        try:
            return Note.objects.get(id=note_id, is_deleted=False)
        except ObjectDoesNotExist:
            raise ValueError(f"Note with id {note_id} does not exist or is deleted")

    @staticmethod
    def get_active_notes():
        return Note.objects.filter(is_archived=False, is_deleted=False)

    @staticmethod
    def get_archived_notes():
        return Note.objects.filter(is_archived=True, is_deleted=False)

    @staticmethod
    def create_note(title: str, content: str, categories: list[int] = None) -> Note:
        note = Note.objects.create(title=title, content=content)
        if categories:
            note.categories.add(*Category.objects.filter(id__in=categories, is_deleted=False))
        return note

    @staticmethod
    def update_note(note_id: int, **kwargs) -> Note:
        note = NoteRepository.get_note_by_id(note_id)
        for key, value in kwargs.items():
            setattr(note, key, value)
        note.save()
        return note

    @staticmethod
    def delete_note(note_id: int):
        note = NoteRepository.get_note_by_id(note_id)
        note.is_deleted = True
        note.save()

    @staticmethod
    def archive_note(note_id: int):
        note = NoteRepository.get_note_by_id(note_id)
        note.is_archived = True
        note.save()

    @staticmethod
    def get_category_by_id(category_id: int) -> Category:
        try:
            return Category.objects.get(id=category_id, is_deleted=False)
        except ObjectDoesNotExist:
            raise ValueError(f"Category with id {category_id} does not exist or is deleted")

    @staticmethod
    def get_all_categories():
        return Category.objects.filter(is_deleted=False)

    @staticmethod
    def create_category(name: str) -> Category:
        return Category.objects.create(name=name)

    @staticmethod
    def delete_category(category_id: int):
        category = NoteRepository.get_category_by_id(category_id)
        category.is_deleted = True
        category.save()

    @staticmethod
    def add_category_to_note(note_id: int, category_id: int):
        note = NoteRepository.get_note_by_id(note_id)
        category = NoteRepository.get_category_by_id(category_id)
        note.categories.add(category)

    @staticmethod
    def remove_category_from_note(note_id: int, category_id: int):
        note = NoteRepository.get_note_by_id(note_id)
        category = NoteRepository.get_category_by_id(category_id)
        note.categories.remove(category)