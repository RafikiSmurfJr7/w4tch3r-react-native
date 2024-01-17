from pydantic import BaseModel

from fastapi import APIRouter,HTTPException

from database.db import users,favorites
from models.User import User
from models.Favorite import Favorite



import json
router = APIRouter(prefix="/favorites")


def get_last_id():

    last_id = favorites.find().sort("fav_id")
    
    dataArr = list()

    for data in last_id:
        print(data)
        dataArr.append(data) 


    if len(dataArr) > 0:
        return data["fav_id"]
    else:
        return 0

@router.get('/')
async def index_fav(token:str | None):
    
    user = User

    user_id = user.get_id_from_token(token)
    
    query = favorites.find({'user_id': user_id},{"_id":0})
      
    response = list()

    for data in query:
        response.append(data.copy())
  
    if len(response) <= 0:
        raise HTTPException(status_code=404, detail="No favorites")
    else:
        return response   


@router.post('/create')
def create_fav(favorite: Favorite):
    
    print(favorite)

    user = User

    user_id = user.get_id_from_token(favorite.user_token)
    print(get_last_id())
    try:
        query = favorites.insert_one({"fav_id": (get_last_id()+1),'user_id': user_id, "tmdb_id": favorite.tmdb_id})
    except (Exception) as e:
        print(e)
        raise HTTPException(status_code=500, detail="Erro adding to favorites")
    
    return {"response": "Added to fav"}   




@router.delete('/delete/{fav_id}')
async def delete_fav(fav_id:int | None):
    
    favorites.delete_one({"fav_id":fav_id})
    
    return {}
