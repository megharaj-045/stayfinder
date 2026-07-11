from sqlalchemy.ext.asyncio import AsyncEngine

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

from app.db.base import Base
from app.db.models import Booking, Listing, User, Wishlist
from app.db.seed import seed_database


async def init_db(engine: AsyncEngine):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    SessionLocal = sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

    async with SessionLocal() as session:
        await seed_database(session)