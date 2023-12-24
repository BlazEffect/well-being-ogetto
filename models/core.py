from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    pfp_url = Column(String, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    mail = Column(String, index=True, unique=True)
    privilege = Column(Integer, index=True)  # 0 - юзер, 1 - организатор, 2 - админ
    token = Column(String, unique=True)
    created_at = Column(Integer, index=True)

    cards = relationship("Card", back_populates="user")
    liked_cards = relationship("Card", secondary="UserCardLike", backref="users_liked")

    def serialize(self):
        return {
            "key": self.id,
            "name": f"{self.first_name} {self.last_name}",
            "email": self.mail,
            "role": self.privilege
        }


class UserCardLike(Base):
    __tablename__ = "UserCardLike"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    card_id = Column(Integer, ForeignKey('Card.id'))
    user = relationship("User")
    card = relationship("Card", overlaps="liked_cards,users_liked")


class Card(Base):
    __tablename__ = "Card"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    description = Column(String, index=True, unique=True)
    tags = Column(String, index=True)
    category = Column(String, index=True)
    time_start = Column(Integer, index=True)
    time_end = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    url = Column(String, index=True)
    likes = Column(Integer, index=True)

    user = relationship("User", back_populates="cards")
    comments = relationship("Comment", back_populates="card")

    def serialize(self):
        user_name = f"{self.user.first_name} {self.user.last_name}" if self.user else None
        return {
            "key": self.id,
            "name": self.name,
            "description": self.description,
            "time_start": self.time_start,
            "time_end": self.time_end,
            "user_id": self.user_id,
            "user_name": user_name
        }


class Participation(Base):
    __tablename__ = "Participation"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    event_id = Column(Integer, ForeignKey('Card.id'))
    user = relationship("User", backref="participations")
    event = relationship("Card")


class Comment(Base):
    __tablename__ = "Comment"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    user_id = Column(Integer, ForeignKey('User.id'))
    card_id = Column(Integer, ForeignKey('Card.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    card = relationship("Card", back_populates="comments")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "user_id": self.user_id,
            "card_id": self.card_id,
            "created_at": self.created_at
        }
