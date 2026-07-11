# StayFinder

An original full-stack marketplace for browsing and booking stays — built as an Airbnb-style assignment project using Next.js, FastAPI, and SQLite.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, Pydantic |
| Database | SQLite (via SQLAlchemy async + aiosqlite) |
| Deployment | Vercel (Frontend) + Render (Backend)|

## Prerequisites

- **Node.js** 18 or newer
- **Python** 3.11 or newer
- **npm** (bundled with Node.js)

## Project Structure

```
StayFinder/
├── frontend/          # Next.js client
│   ├── app/           # App Router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # API client utilities
│   └── types/         # Shared TypeScript types
├── backend/           # FastAPI server
│   └── app/
│       ├── api/       # Route handlers
│       ├── core/      # Configuration
│       ├── db/        # Database connection
│       └── schemas/   # Pydantic models
└── README.md
```

## Local Setup

### 1. Clone and enter the repository

```bash
git clone <your-repo-url>
cd StayFinder
```

### 2. Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux

uvicorn app.main:app --reload --port 8000
```

The API runs at [http://localhost:8000](http://localhost:8000).

Health check: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
copy .env.local.example .env.local   # Windows
# cp .env.local.example .env.local   # macOS / Linux

npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). The home page shows an **API connected** badge when the backend is reachable.

## Architecture Overview

```mermaid
flowchart LR
    subgraph client [Next.js Frontend]
        Pages[App Router Pages]
        Components[UI Components]
        ApiClient[lib/api.ts]
    end

    subgraph server [FastAPI Backend]
        Routes[Route Handlers]
        Services[Business Logic - Milestone 3+]
        Repos[Data Access - Milestone 2+]
    end

    subgraph data [SQLite]
        DB[(stayfinder.db)]
    end

    Pages --> Components
    Components --> ApiClient
    ApiClient -->|HTTP JSON| Routes
    Routes --> Services --> Repos --> DB
```

### Design principles

- **Thin routes, thick services** — HTTP handlers validate and delegate; business rules live in service modules (added in Milestone 3).
- **Versioned API** — All endpoints are prefixed with `/api/v1`.
- **Typed boundaries** — Pydantic on the backend, TypeScript interfaces on the frontend.
- **Separate deployments** — Frontend and backend communicate over HTTP with CORS configured for cross-origin requests.

## Assumptions

- **Authentication** is simplified/mocked (session-based guest vs host roles).
- **Payments** are mocked — no real payment gateway.
- **Images** use placeholder URLs from seed data (no cloud upload in core scope).
- **Maps** may use a static image or lightweight library.
- **Prices** are stored in cents (integer) to avoid floating-point rounding errors.

 ## Database Schema

The application currently includes the following tables:

- Users
- Listings
- Bookings
- Wishlist

Each listing contains:

- Title
- Description
- Location
- Property Type
- Price per Night
- Rating
- Bedrooms
- Bathrooms
- Beds
- Maximum Guests
- Amenities (WiFi, Kitchen, Parking, Pool, Air Conditioning)
- Host ID

## API Overview

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| GET    | `/api/v1/health`          | Health check         |
| GET    | `/api/v1/listings`        | Get all listings     |
| GET    | `/api/v1/listings/{id}`   | Get listing details  |
| GET    | `/api/v1/listings/search` | Search listings      |
| POST   | `/api/v1/listings`        | Create listing       |
| PUT    | `/api/v1/listings/{id}`   | Update listing       |
| DELETE | `/api/v1/listings/{id}`   | Delete listing       |
| GET    | `/api/v1/bookings`        | Get bookings         |
| POST   | `/api/v1/bookings`        | Create booking       |
| GET    | `/api/v1/wishlist`        | Get wishlist         |
| POST   | `/api/v1/wishlist`        | Add to wishlist      |
| DELETE | `/api/v1/wishlist/{id}`   | Remove from wishlist |

## Features Implemented

- ✅ Property search by location
- ✅ Guest-based search
- ✅ Property type filters
- ✅ Listing detail page
- ✅ Booking system
- ✅ Trips page
- ✅ Wishlist
- ✅ Host dashboard
- ✅ Create Listing
- ✅ Edit Listing
- ✅ Delete Listing
- ✅ Responsive UI
- ✅ SQLite database
- ✅ FastAPI REST API
- ✅ Next.js App Router


