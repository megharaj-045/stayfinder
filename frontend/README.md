# 🏠 StayFinder

StayFinder is a full-stack Airbnb-inspired accommodation booking platform built using **Next.js**, **FastAPI**, **SQLAlchemy**, and **SQLite**.

It allows users to browse stays, search properties, manage wishlists, book accommodations, and hosts to manage property listings.

---

# ✨ Features

## User

- Browse all listings
- Search by location
- Filter by property type
- View listing details
- Book stays
- Wishlist management
- View booked trips

## Host

- Host Dashboard
- Add Listing
- Delete Listing

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

---

# 📂 Project Structure

```
frontend/
    app/
    components/
    lib/
    types/

backend/
    app/
        api/
        crud/
        db/
        schemas/
```

---

# 🚀 Installation

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

API Documentation

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# 📸 Screens

- Home
- Listing Details
- Wishlist
- Trips
- Host Dashboard
- Add Listing

---

# 👨‍💻 Developed By

**Megharaj Jayi**

Artificial Intelligence & Machine Learning

BMS College of Engineering

---

# 📄 License

This project was developed as an academic internship assignment.