from fastapi import APIRouter,HTTPException
from database.db import users
from models.User import User

router = APIRouter(prefix="/auth")


@router.get('/')
def index_auth():

        response = users.find_one()
        return {'username':response['username'],'token':response['token']}


@router.post('/login')
async def auth_login(user: User):
        response = users.find_one({"username": user.username, "password": user.password})
        if response:
                return {"token":response["token"]}
        else:
                raise HTTPException(status_code=401, detail="Invalid Data!")


@router.get('/user')
async def auth_user(token:str | None):
        
        response = users.find_one({"token": token},{"_id": 0})
        return response



@router.put('/user/update')
async def auth_user_update(user: User):
        
        response = users.update_one({"token": user.token}, {"$set": {"username": user.username, "email": user.email}})

        response = users.find_one({"token": user.token},{"_id":0})


        return response
