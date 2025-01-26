from django.contrib.auth.hashers import make_password
from ..models import User

class UserRepository:
    @staticmethod
    def create_user(username, password):
        return User.objects.create(
            username=username,
            password=make_password(password)
        )

    @staticmethod
    def get_user_by_credentials(username, password):
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            return user
        return None

    @staticmethod
    def create_default_user():
        if not User.objects.filter(username='saul').exists():
            UserRepository.create_user('saul', '12345')