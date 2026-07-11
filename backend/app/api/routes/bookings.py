from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.booking import (
    create_booking,
    get_all_bookings,
)

from app.db.connection import get_db

from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)


@router.get("/", response_model=List[BookingResponse])
async def read_bookings(
    db: AsyncSession = Depends(get_db),
):
    return await get_all_bookings(db)


from fastapi import HTTPException
@router.post("/", response_model=BookingResponse)
async def book_listing(
    booking: BookingCreate,
    db: AsyncSession = Depends(get_db),
):
    try:
        return await create_booking(db, booking)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))