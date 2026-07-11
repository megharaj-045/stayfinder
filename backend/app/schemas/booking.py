from datetime import date

from pydantic import BaseModel


class BookingCreate(BaseModel):
    user_id: int
    listing_id: int
    check_in: date
    check_out: date
    guests: int
    total_price: float


class BookingResponse(BookingCreate):
    id: int

    class Config:
        from_attributes = True