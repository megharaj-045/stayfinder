from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import User
from app.schemas.user import UserCreate


async def create_user(db: AsyncSession, user: UserCreate):
    obj = User(**user.model_dump())

    db.add(obj)

    await db.commit()
    await db.refresh(obj)

    return obj