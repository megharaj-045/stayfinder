from pydantic import BaseModel


class WishlistCreate(BaseModel):
    user_id: int
    listing_id: int


class WishlistResponse(WishlistCreate):
    id: int

    class Config:
        from_attributes = True