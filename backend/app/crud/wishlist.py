from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Wishlist
from app.schemas.wishlist import WishlistCreate


async def get_all_wishlist(db: AsyncSession):
    result = await db.execute(
        select(Wishlist).order_by(Wishlist.id.desc())
    )
    return result.scalars().all()


async def add_to_wishlist(
    db: AsyncSession,
    wishlist: WishlistCreate,
):
    obj = Wishlist(**wishlist.model_dump())

    db.add(obj)

    await db.commit()

    await db.refresh(obj)

    return obj


async def delete_wishlist(
    db: AsyncSession,
    wishlist_id: int,
):
    result = await db.execute(
        select(Wishlist).where(Wishlist.id == wishlist_id)
    )

    item = result.scalar_one_or_none()

    if item:
        await db.delete(item)
        await db.commit()

    return item