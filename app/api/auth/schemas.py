import re

from pydantic import BaseModel, Field, field_validator, model_validator
from pydantic.alias_generators import to_camel
from pydantic.v1 import EmailStr


class UserRegister(BaseModel):
    model_config = {
        'from_attributes': True,
        'alias_generator': to_camel,
        'populate_by_name': True
    }

    name: str = Field(..., min_length=2, max_length=100, description="Имя")
    email: str = Field(..., description="Почта")
    password: str = Field(..., min_length=8, description="Пароль")

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError('Пароль минимум 8 символов')
        if not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', v):
            raise ValueError('Пароль: 1 заглавная, 1 строчная, 1 цифра, 1 спецсимвол')
        return v


class Token(BaseModel):
    model_config = {'from_attributes': True}

    access_token: str
    token_type: str = "bearer"
