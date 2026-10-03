from typing import Optional

from sqlalchemy.orm import Session

from app.api.auth.schemas import UserRegister
from app.api.auth.utils import get_password_hash, create_access_token, verify_password
from app.api.shared.models import User


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def register_user(self, user_data: UserRegister) -> str:
        if self._user_exists(user_data.name):
            raise ValueError("Пользователь с такой почтой уже существует")

        user = User(
            name=user_data.name,
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password)
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return create_access_token({"sub": user.email})

    def authenticate_user(self, username: str, password: str) -> Optional[str]:
        user = self._get_user_by_email(username)
        if not user or not verify_password(password, user.hashed_password):
            return None

        return create_access_token({"sub": user.email})

    def _user_exists(self, email: str) -> bool:
        return self.db.query(User).filter(User.email == email).first() is not None

    def _get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()
