from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session

from models.core import Card, User, Participation
from models.database import get_db

media_router = APIRouter(prefix='/api/media')


def get_user_info(user_id: int, session: Session):
    user = session.query(User).filter(User.id == user_id).first()
    if user:
        return {
            "pfp_url": user.pfp_url,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "user_info": get_user_info(user_id, session)
        }


@media_router.get('/bydate')
def datecard(date: str, session: Session = Depends(get_db)):
    cards = session.query(Card).filter(Card.time_start == date).all()
    cards_data = []
    for card in cards:
        cards_data.append({
            "id": card.id,
            "name": card.name,
            "title": card.title,
            "time_start": card.time_start,
            "time_end": card.time_end,
            "user_info": get_user_info(card.user_id, session)
        })
    return cards_data


@media_router.get('/byuser/{user_id}')
def user_cards(user_id: int, session: Session = Depends(get_db)):
    cards = session.query(Card).filter(Card.user_id == user_id).order_by(desc(Card.time_start)).all()
    cards_data = []
    for card in cards:
        cards_data.append({
            "id": card.id,
            "name": card.name,
            "title": card.title,
            "time_start": card.time_start,
            "time_end": card.time_end,
            "user_info": get_user_info(card.user_id, session)
        })
    return cards_data


@media_router.post('/join_card/{card_id}')
def join_card(card_id: int, user_id: int, session: Session = Depends(get_db)):
    card = session.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(404)
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404)

    existing_participation = (
        session.query(Participation)
        .filter(Participation.user_id == user_id, Participation.event_id == card_id)
        .first()
    )
    if existing_participation:
        return {"message": "User is already participating in this card"}

    new_participation = Participation(user_id=user_id, event_id=card_id)
    session.add(new_participation)
    session.commit()

    return {"message": "User has successfully joined the card"}


@media_router.get('/search_card')
def search_card_by_title(title: str, session: Session = Depends(get_db)):
    matching_cards = session.query(Card).filter(Card.title.ilike(f"%{title}%")).all()

    if not matching_cards:
        raise HTTPException(404)

    cards_data = []
    for card in matching_cards:
        cards_data.append({
            "id": card.id,
            "name": card.name,
            "title": card.title,
            "time_start": card.time_start,
            "time_end": card.time_end,
            "user_info": get_user_info(card.user_id, session)
        })
    return {"matching_cards": cards_data}