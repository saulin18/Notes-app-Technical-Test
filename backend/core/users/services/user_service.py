from ..repositories.user_repository import UserRepository

class UserService:
    @staticmethod
    def authenticate_user(username, password):
        return UserRepository.get_user_by_credentials(username, password)