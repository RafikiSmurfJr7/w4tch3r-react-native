from typing import Union
from fastapi import FastAPI
from routers import auth, favorites


app = FastAPI()

app.include_router(auth.router)
app.include_router(favorites.router)


@app.get("/",status_code=200)
def index():

    return {}
