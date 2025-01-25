from notes.models import Category, Note
from notes.repositories.note_repository import NoteRepository


class NoteService:
    @staticmethod
    def get_note_by_id(note_id: int) -> Note:
        return NoteRepository.get_note_by_id(note_id)

    @staticmethod
    def get_active_notes():
        return NoteRepository.get_active_notes()

    @staticmethod
    def get_archived_notes():
        return NoteRepository.get_archived_notes()

    @staticmethod
    def create_note(title: str, content: str, categories: list[int] = None):
        if not title or not content:
            raise ValueError("Title and content are required")
        return NoteRepository.create_note(title, content, categories)

    @staticmethod
    def update_note(note_id: int, **kwargs) -> Note:
        note = NoteRepository.get_note_by_id(note_id)

        categories = kwargs.pop("categories", None)

        for key, value in kwargs.items():
            setattr(note, key, value)
        note.save()

        if categories is not None:
            note.categories.set(categories)

        return note

    @staticmethod
    def delete_note(note_id: int):
        NoteRepository.delete_note(note_id)

    @staticmethod
    def archive_note(note_id: int):
        NoteRepository.archive_note(note_id)

    @staticmethod
    def unarchive_note(note_id: int):
        note = NoteRepository.get_note_by_id(note_id)
        note.is_archived = False
        note.save()

    @staticmethod
    def get_category_by_id(category_id: int) -> Category:
        return NoteRepository.get_category_by_id(category_id)

    @staticmethod
    def get_all_categories():
        return NoteRepository.get_all_categories()

    @staticmethod
    def create_category(name: str) -> Category:
        if not name:
            raise ValueError("Category name is required")
        return NoteRepository.create_category(name)

    @staticmethod
    def delete_category(category_id: int):
        NoteRepository.delete_category(category_id)

    @staticmethod
    def add_category_to_note(note_id: int, category_id: int):
        NoteRepository.add_category_to_note(note_id, category_id)

    @staticmethod
    def remove_category_from_note(note_id: int, category_id: int):
        NoteRepository.remove_category_from_note(note_id, category_id)
