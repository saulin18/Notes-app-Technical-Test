import uuid
from django.db import models

class Category(models.Model):
    uuid = models.UUIDField( default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Note(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_archived = models.BooleanField(default=False)
    categories = models.ManyToManyField(Category, blank=True, related_name='notes', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title