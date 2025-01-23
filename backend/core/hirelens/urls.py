from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notes.controllers.views import NoteViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/notes/active/', NoteViewSet.as_view({'get': 'list_active'})),
    path('api/notes/inactive/', NoteViewSet.as_view({'get': 'list_inactive'})),
    path('api/notes/<int:pk>/archive/', NoteViewSet.as_view({'post': 'archive'})),
    path('api/notes/', NoteViewSet.as_view({'post': 'create_note'})),
    path('api/notes/<int:pk>/', NoteViewSet.as_view({'delete': 'destroy_note'})),
    path('api/notes/<int:pk>/', NoteViewSet.as_view({'put': 'update_note'})),
    path('admin/', admin.site.urls),
]
