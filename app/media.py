from http.client import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session

from models.core import Card, User, Participation
from models.database import get_db

media_router = APIRouter(prefix='/api/media')


def get_user_by_token(token: str, session: Session):
    return session.query(User).filter(User.token == token).first()


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
    serialized_cards = [card.serialize() for card in cards]
    return serialized_cards


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
def search_card_by_title(name: str, session: Session = Depends(get_db)):
    matching_cards = session.query(Card).filter(Card.name.ilike(f"%{name}%")).all()

    if not matching_cards:
        raise HTTPException(404)
    serialized_cards = [card.serialize() for card in matching_cards]
    return serialized_cards


@media_router.get('/all_cards')
def get_all_cards(session: Session = Depends(get_db)):
    cards = session.query(Card).all()
    serialized_cards = [card.serialize() for card in cards]
    return {"cards":serialized_cards}


@media_router.post('/like')
def like_card(card_id: int, token: str, session: Session = Depends(get_db)):
    user = get_user_by_token(token, session)
    if user:
        card = session.query(Card).filter(Card.id == card_id).first()
        if card:
            user.liked_cards.append(card)
            card.likes += 1
            session.commit()
            return {"message": "Card liked successfully"}
        else:
            raise HTTPException(404,"Card not found")
    else:
        raise HTTPException(401, "Invalid token")