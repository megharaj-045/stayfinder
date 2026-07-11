from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Listing
from app.schemas.listing import ListingCreate


async def get_all_listings(db: AsyncSession):
    result = await db.execute(
        select(Listing).order_by(Listing.rating.desc())
    )
    return result.scalars().all()


async def get_listing(db: AsyncSession, listing_id: int):
    result = await db.execute(
        select(Listing).where(Listing.id == listing_id)
    )
    return result.scalar_one_or_none()


async def search_listings(
    db: AsyncSession,
    location: str | None = None,
    property_type: str | None = None,
    guests: int | None = None,
):
    query = select(Listing)

    if location:
        query = query.where(
            Listing.location.ilike(f"%{location}%")
        )

    if property_type:
        query = query.where(
            Listing.property_type == property_type
        )

    if guests:
        query = query.where(
            Listing.max_guests >= guests
        )

    result = await db.execute(query)

    return result.scalars().all()


async def create_listing(
    db: AsyncSession,
    listing: ListingCreate,
):
    obj = Listing(**listing.model_dump())

    db.add(obj)

    await db.commit()

    await db.refresh(obj)

    return obj


async def delete_listing(
    db: AsyncSession,
    listing_id: int,
):
    listing = await get_listing(db, listing_id)

    if listing is None:
        return None

    await db.delete(listing)

    await db.commit()

    return listing

async def update_listing(
    db: AsyncSession,
    listing_id: int,
    data: ListingCreate,
):
    listing = await get_listing(db, listing_id)

    if listing is None:
        return None

    for key, value in data.model_dump().items():
        setattr(listing, key, value)

    await db.commit()
    await db.refresh(listing)

    return listing