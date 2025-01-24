from notes.models import Category, Note

class NoteRepository:
    @staticmethod
    def get_active_notes():
        return Note.objects.filter(is_archived=False)

    @staticmethod
    def get_archived_notes():
        return Note.objects.filter(is_archived=True)

    @staticmethod
    def create_note(title, content):
        return Note.objects.create(title=title, content=content)

    @staticmethod
    def update_note(note_id, **kwargs):
        Note.objects.filter(id=note_id).update(**kwargs)

    @staticmethod
    def delete_note(note_id):
        Note.objects.filter(id=note_id).delete()
        
    @staticmethod
    def get_note_by_id(note_id):
        return Note.objects.get(id=note_id)
    
    @staticmethod
    def get_category_by_id(category_id):
        return Category.objects.get(id=category_id)
    
    @staticmethod
    def remove_category(note_id, category_id):
        note = Note.objects.get(id=note_id)
        category = Category.objects.get(id=category_id)
        note.categories.remove(category)
        note.save()
        
    @staticmethod
    def archive_note(note_instance):
        note_instance.is_archived = True
        note_instance.save()    
     
    @staticmethod
    def get_all_categories():
        return Category.objects.all()
    
    @staticmethod
    def create_category(name):
        return Category.objects.create(name=name)
    
    @staticmethod
    def delete_category(category_id):
        Category.objects.filter(id=category_id).delete()