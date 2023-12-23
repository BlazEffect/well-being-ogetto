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

    videos = relationship("Video", back_populates="user")
    cards = relationship("Card", back_populates="user")
    liked_cards = relationship("Card", secondary="UserCardLike", backref="users_liked")

    def serialize(self):
        return {
            "key": self.id,
            "name": self.first_name + self.last_name,
            "email": self.mail,
            "role": self.privilege
        }


class UserCardLike(Base):
    __tablename__ = "UserCardLike"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    card_id = Column(Integer, ForeignKey('Card.id'))
    user = relationship("User")
    card = relationship("Card")


class Video(Base):
    __tablename__ = "Video"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))

    user = relationship("User", back_populates="videos")


class Card(Base):
    __tablename__ = "Card"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    description = Column(String, index=True, unique=True)
    time_start = Column(Integer, index=True)
    time_end = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    likes = Column(Integer, index=True)

    user = relationship("User", back_populates="cards")

    def serialize(self):
        return {
            "key": self.id,
            "name": self.name,
            "description": self.description,
            "time_start": self.time_start,
            "time_end": self.time_end,
            "user_id": self.user_id,
            "user_name": f"{self.user.first_name} {self.user.last_name}"
        }


class Participation(Base):
    __tablename__ = "Participation"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    event_id = Column(Integer, ForeignKey('Card.id'))
    user = relationship("User", backref="participations")
    event = relationship("Card")
