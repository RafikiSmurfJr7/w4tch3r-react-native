from pydantic import BaseModel


class Favorite(BaseModel):
    user_token: str
    tmdb_id: str 