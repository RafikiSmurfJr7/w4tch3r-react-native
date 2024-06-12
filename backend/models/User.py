from pydantic import BaseModel
from database.db import users

class BaseUser(BaseModel):
    username: str
    password: str | None = None
    email: str | None = None
    token: str | None = None

class User(BaseUser):
    def get_id_from_token(token):
        
        response = users.find_one({"token":token},{"_id":0})

        print(token)

        print(response)


        return response["user_id"]

    