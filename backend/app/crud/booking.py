from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Booking
from app.schemas.booking import BookingCreate


async def get_all_bookings(db: AsyncSession):
    result = await db.execute(
        select(Booking).order_by(Booking.id.desc())
    )
    return result.scalars().all()

from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models import Booking
from app.schemas.booking import BookingCreate


async def get_all_bookings(db: AsyncSession):
    result = await db.execute(
        select(Booking).order_by(Booking.id.desc())
    )
    return result.scalars().all()


async def create_booking(
    db: AsyncSession,
    booking: BookingCreate,
):
    result = await db.execute(
        select(Booking).where(
            and_(
                Booking.listing_id == booking.listing_id,
                or_(
                    and_(
                        Booking.check_in <= booking.check_in,
                        Booking.check_out > booking.check_in,
                    ),
                    and_(
                        Booking.check_in < booking.check_out,
                        Booking.check_out >= booking.check_out,
                    ),
                    and_(
                        Booking.check_in >= booking.check_in,
                        Booking.check_out <= booking.check_out,
                    ),
                ),
            )
        )
    )

    existing = result.scalar_one_or_none()

    if existing:
        raise ValueError("Selected dates are unavailable")

    obj = Booking(**booking.model_dump())

    db.add(obj)

    await db.commit()

    await db.refresh(obj)

    return obj