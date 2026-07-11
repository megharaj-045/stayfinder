from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.user import create_user
from app.db.connection import get_db
from app.schemas.user import (
    UserCreate,
    UserResponse,
)

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserResponse)
async def register_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_user(db, user)
