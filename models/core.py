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
    created_at = Column(DateTime, index=True)

    videos = relationship("Video", back_populates="user")
    cards = relationship("Card", back_populates="user")


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
    time_start = Column(DateTime, index=True)
    time_end = Column(DateTime, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    likes = Column(Integer, index=True)

    user = relationship("User", back_populates="cards")


class Participation(Base):
    __tablename__ = "Participation"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    event_id = Column(Integer, ForeignKey('Card.id'))
    user = relationship("User", backref="participations")
    event = relationship("Card")
