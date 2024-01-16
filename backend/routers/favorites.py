from pydantic import BaseModel

from fastapi import APIRouter,HTTPException

from database.db import users,favorites
import json
router = APIRouter(prefix="/favorites")


@router.get('/')
def index_auth(id:int | None):
    query = favorites.find({'user_id': id},{"_id":0})
      
    response = list()

    for data in query:
        response.append(data.copy())
  
    if len(response) <= 0:
        raise HTTPException(status_code=404, detail="No favorites")
    else:
        return response   


