from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.listing import (
    create_listing,
    delete_listing,
    get_all_listings,
    get_listing,
    search_listings,
    update_listing,
)
from app.db.connection import get_db
from app.schemas.listing import (
    ListingCreate,
    ListingResponse,
)

router = APIRouter(
    prefix="/listings",
    tags=["Listings"],
)


@router.get("/", response_model=List[ListingResponse])
async def read_listings(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_listings(db)


@router.get("/search", response_model=List[ListingResponse])
async def search(
    location: str | None = Query(default=None),
    property_type: str | None = Query(default=None),
    guests: int | None = Query(default=None),
    db: AsyncSession = Depends(get_db),
):
    return await search_listings(
        db,
        location,
        property_type,
        guests,
    )

@router.get("/{listing_id}", response_model=ListingResponse)
async def read_listing(
    listing_id: int,
    db: AsyncSession = Depends(get_db),
):
    return await get_listing(
        db,
        listing_id,
    )


@router.post("/", response_model=ListingResponse)
async def create(
    listing: ListingCreate,
    db: AsyncSession = Depends(get_db),
):
    return await create_listing(
        db,
        listing,
    )

@router.put("/{listing_id}", response_model=ListingResponse)
async def update(
    listing_id: int,
    listing: ListingCreate,
    db: AsyncSession = Depends(get_db),
):
    return await update_listing(
        db,
        listing_id,
        listing,
    )


@router.delete("/{listing_id}")
async def remove_listing(
    listing_id: int,
    db: AsyncSession = Depends(get_db),
):
    listing = await delete_listing(
        db,
        listing_id,
    )

    if listing is None:
        return {
            "message": "Listing not found"
        }

    return {
        "message": "Listing deleted"
    }