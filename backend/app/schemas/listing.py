from pydantic import BaseModel


class ListingCreate(BaseModel):
    title: str
    description: str
    location: str
    property_type: str
    image_url: str
    price_per_night: float

    rating: float = 4.5
    reviews_count: int = 0

    bedrooms: int
    bathrooms: int
    beds: int

    max_guests: int

    wifi: bool = True
    kitchen: bool = True
    parking: bool = False
    pool: bool = False
    air_conditioning: bool = True

    host_id: int


class ListingResponse(ListingCreate):
    id: int

    class Config:
        from_attributes = True