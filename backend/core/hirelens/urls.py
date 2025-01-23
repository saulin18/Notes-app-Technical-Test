from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notes.controllers.views import NoteViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
   path(
        'api/notes/add-category-to-note/<int:note_id>/<int:category_id>/',
        NoteViewSet.add_category_to_note
    ),
    path(
        'api/notes/remove-category-from-note/<int:note_id>/<int:category_id>/',
        NoteViewSet.remove_category_from_note
    ),
]  