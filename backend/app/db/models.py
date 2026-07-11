from datetime import date, datetime

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    full_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(120), unique=True)
    avatar: Mapped[str] = mapped_column(
        String(500),
        default="https://i.pravatar.cc/150",
    )

    is_host: Mapped[bool] = mapped_column(Boolean, default=False)

    listings = relationship(
        "Listing",
        back_populates="host",
        cascade="all, delete",
    )

    bookings = relationship(
        "Booking",
        back_populates="user",
        cascade="all, delete",
    )


class Listing(Base):
    __tablename__ = "listings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    title: Mapped[str] = mapped_column(String(200))

    description: Mapped[str] = mapped_column(Text)

    location: Mapped[str] = mapped_column(String(200))

    property_type: Mapped[str] = mapped_column(String(50))

    image_url: Mapped[str] = mapped_column(String(500))

    price_per_night: Mapped[float] = mapped_column(Float)

    rating: Mapped[float] = mapped_column(Float, default=4.8)

    reviews_count: Mapped[int] = mapped_column(Integer, default=0)

    bedrooms: Mapped[int] = mapped_column(Integer)

    bathrooms: Mapped[int] = mapped_column(Integer)

    beds: Mapped[int] = mapped_column(Integer)

    max_guests: Mapped[int] = mapped_column(Integer)

    wifi: Mapped[bool] = mapped_column(Boolean, default=True)

    kitchen: Mapped[bool] = mapped_column(Boolean, default=True)

    parking: Mapped[bool] = mapped_column(Boolean, default=False)

    pool: Mapped[bool] = mapped_column(Boolean, default=False)

    air_conditioning: Mapped[bool] = mapped_column(Boolean, default=True)

    host_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    host = relationship("User", back_populates="listings")

    bookings = relationship(
        "Booking",
        back_populates="listing",
        cascade="all, delete",
    )


class Booking(Base):
    __tablename__ = "bookings"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id")
    )

    check_in: Mapped[date] = mapped_column(Date)

    check_out: Mapped[date] = mapped_column(Date)

    guests: Mapped[int] = mapped_column(Integer)

    total_price: Mapped[float] = mapped_column(Float)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship("User", back_populates="bookings")

    listing = relationship("Listing", back_populates="bookings")


class Wishlist(Base):
    __tablename__ = "wishlist"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    listing_id: Mapped[int] = mapped_column(
        ForeignKey("listings.id")
    )