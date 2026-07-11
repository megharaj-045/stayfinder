from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.wishlist import (
    add_to_wishlist,
    delete_wishlist,
    get_all_wishlist,
)

from app.db.connection import get_db

from app.schemas.wishlist import (
    WishlistCreate,
    WishlistResponse,
)

router = APIRouter(
    prefix="/wishlist",
    tags=["Wishlist"],
)


@router.get("/", response_model=List[WishlistResponse])
async def read_wishlist(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_wishlist(db)


@router.post("/", response_model=WishlistResponse)
async def save_listing(
    wishlist: WishlistCreate,
    db: AsyncSession = Depends(get_db),
):
    return await add_to_wishlist(
        db,
        wishlist,
    )


@router.delete("/{wishlist_id}")
async def remove_listing(
    wishlist_id: int,
    db: AsyncSession = Depends(get_db),
):
    await delete_wishlist(
        db,
        wishlist_id,
    )

    return {
        "message": "Removed from wishlist"
    }