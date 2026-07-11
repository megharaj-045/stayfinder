from contextlib import asynccontextmanager
from app.db.init_db import init_db

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.db.connection import engine
from app.api.routes import (
    bookings,
    health,
    listings,
    users,
    wishlist,
)


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_db(engine)
    yield
    await engine.dispose()


def create_app() -> FastAPI:
    settings = get_settings()

    application = FastAPI(
        title=settings.app_name,
        lifespan=lifespan,
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(health.router, prefix=settings.api_prefix)
    application.include_router(
    users.router,
    prefix=settings.api_prefix,
)

    application.include_router(
    listings.router,
    prefix=settings.api_prefix,
)

    application.include_router(
    bookings.router,
    prefix=settings.api_prefix,
)

    application.include_router(
    wishlist.router,
    prefix=settings.api_prefix,
)

    return application


app = create_app()
