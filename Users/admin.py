from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.core import Card, User
from models.database import get_db
from fastapi import HTTPException

contr_router = APIRouter(prefix='/api')


def get_perm_by_token(token: str, session: Session = get_db):
    user = session.query(User).filter_by(token=token)
    if user:
        return user.privilege


@contr_router.post('/add_card')
def card(name: str, description: str, time_start: datetime, time_end: datetime, session: Session = Depends(get_db)):
    new_card = Card(name=name, description=description, time_start=time_start, time_end=time_end)
    session.add(new_card)
    session.commit()
    return {"message": "Card added successfully"}


@contr_router.put('/change_perm')
def user_perm(user_id: int, token: str, new_perm: int, session: Session = Depends(get_db)):
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        return HTTPException(status_code=404, detail="User not found")

    admin = session.query(User).filter(User.token == token, User.privilege == 2).first()
    if not admin:
        return HTTPException(status_code=403, detail="Insufficient privileges")

    user.privilege = new_perm
    session.commit()

    return {"msg": "ye"}


@contr_router.post('/reg')
def reg_user(
        token: str,
        first_name: str,
        last_name: str,
        mail: str,
        pfp_url: str,
        session: Session = Depends(get_db)
):
    user = session.query(User).filter_by(mail=mail).first()

    if user:
        user.token = token
    else:
        user = User(
            token=token,
            first_name=first_name,
            last_name=last_name,
            mail=mail,
            pfp_url=pfp_url,
            created_at=datetime.now(),
            privilege=0
        )
        session.add(user)

    session.commit()

    return {
        "id": user.id,
        "token": user.token,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "mail": user.mail,
        "pfp_url": user.pfp_url,
        "created_at": user.created_at,
        "privilege": user.privilege
    }
