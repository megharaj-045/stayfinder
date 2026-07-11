from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import User, Listing


async def seed_database(db: AsyncSession):
    result = await db.execute(select(User))
    existing_users = result.scalars().all()

    if existing_users:
        return

    host = User(
        full_name="Rahul Sharma",
        email="host@stayfinder.com",
        avatar="https://i.pravatar.cc/150?img=12",
        is_host=True,
    )

    db.add(host)
    await db.flush()

    listings = [
        Listing(
            title="Luxury Beach Villa",
            description="Beautiful villa with sea view.",
            location="Goa",
            property_type="Villa",
            image_url="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            price_per_night=8500,
            rating=4.9,
            reviews_count=210,
            bedrooms=3,
            bathrooms=2,
            beds=3,
            max_guests=6,
            wifi=True,
            kitchen=True,
            parking=True,
            pool=True,
            air_conditioning=True,
            host_id=host.id,
        ),
        Listing(
            title="Mountain Cabin",
            description="Peaceful cabin in the hills.",
            location="Manali",
            property_type="Cabin",
            image_url="https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
            price_per_night=4200,
            rating=4.8,
            reviews_count=154,
            bedrooms=2,
            bathrooms=1,
            beds=2,
            max_guests=4,
            wifi=True,
            kitchen=True,
            parking=True,
            pool=False,
            air_conditioning=False,
            host_id=host.id,
        ),
        Listing(
            title="Modern City Apartment",
            description="Apartment in city center.",
            location="Bangalore",
            property_type="Apartment",
            image_url="https://images.unsplash.com/photo-1494526585095-c41746248156",
            price_per_night=3500,
            rating=4.7,
            reviews_count=98,
            bedrooms=2,
            bathrooms=2,
            beds=2,
            max_guests=4,
            wifi=True,
            kitchen=True,
            parking=False,
            pool=False,
            air_conditioning=True,
            host_id=host.id,
        ),
        Listing(
            title="Lake View Cottage",
            description="Relax beside the lake.",
            location="Ooty",
            property_type="Cottage",
            image_url="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            price_per_night=5100,
            rating=4.9,
            reviews_count=180,
            bedrooms=2,
            bathrooms=2,
            beds=2,
            max_guests=5,
            wifi=True,
            kitchen=True,
            parking=True,
            pool=False,
            air_conditioning=True,
            host_id=host.id,
        ),
    ]

    db.add_all(listings)

    await db.commit()