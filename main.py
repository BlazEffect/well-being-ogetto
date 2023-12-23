from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from Users.admin import contr_router
from app.media import media_router

app = FastAPI()
app.include_router(contr_router)
app.include_router(media_router)

