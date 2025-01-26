from django.conf import settings
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.controllers.views import UserViewSet
from notes.controllers.views import NoteViewSet
from django.contrib import admin
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'notes', NoteViewSet)
router.register(r'users', UserViewSet)

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
     path('login/', UserViewSet.as_view({'post': 'login'}), name='user-login'),
]  

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)