from django.urls import path, include
from rest_framework.routers import DefaultRouter
from notes.controllers.views import NoteViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
