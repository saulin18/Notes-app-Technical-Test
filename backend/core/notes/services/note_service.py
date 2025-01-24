from notes.repositories.note_repository import NoteRepository


class NoteService:
    @staticmethod
    def get_active_notes():
        return NoteRepository.get_active_notes()

    @staticmethod
    def get_archived_notes():
        return NoteRepository.get_archived_notes()

    @staticmethod
    def create_note(title, content):
        if not title or not content:
            raise ValueError("Title and content are required")
        return NoteRepository.create_note(title, content)

    @staticmethod
    def archive_note(note_instance):
        NoteRepository.archive_note(note_instance)

    @staticmethod
    def unarchive_note(note_id):
        NoteRepository.update_note(note_id, is_archived=False)

    @staticmethod
    def get_note_by_id(note_id):
        return NoteRepository.get_note_by_id(note_id)

    @staticmethod
    def delete_note(self, pk):
        note = NoteRepository.get_note_by_id(pk)
        NoteRepository.delete_note(note.id)

    @staticmethod
    def update_note(self, pk):
        note = NoteRepository.get_note_by_id(pk)
        NoteRepository.update_note(pk, title=note.title, content=note.content)

    @staticmethod
    def get_category_by_id(category_id):
        return NoteRepository.get_category_by_id(category_id)

    @staticmethod
    def remove_category(note_id, category_id):
        NoteRepository.remove_category(note_id, category_id)
        
    @staticmethod
    def get_all_categories():
        return NoteRepository.get_all_categories()
    
    @staticmethod
    def create_category(name):
        return NoteRepository.create_category(name)
    
    @staticmethod
    def delete_category(category_id):
        NoteRepository.delete_category(category_id)
