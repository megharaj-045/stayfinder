"use client";

import { useEffect, useState } from "react";


import ListingCard from "@/components/ui/ListingCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { getListings, searchListings } from "@/lib/api";
import type { Listing } from "@/types/api";

const categoryChips = [
  "Apartment",
  "Villa",
  "Cabin",
  "House",
  "Cottage",
  "Bungalow",
  "Treehouse",
  "Resort",
];

const moreCategories = [
  "Farm Stay",
  "Loft",
  "Boat",
  "Tent",
  "Lodge",
  "Castle",
  "Palace",
  "Camp",
  "Dome",
];

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [guests, setGuests] = useState(1);

  async function loadAll() {
    setLoading(true);

    try {
      const data = await getListings();
      setListings(data);
    } finally {
      setLoading(false);
    }
  }

  async function search() {
  setLoading(true);

  try {
    const data = await searchListings(
      location,
      selectedType,
      guests
    );

    setListings(data);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <main className="flex-1 bg-white">

      <section className="border-b">

        <div className="mx-auto max-w-7xl px-4 py-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Explore stays
              </h1>

              <p className="mt-2 text-gray-500">
                Find your next destination
              </p>

            </div>

            <StatusBadge />

          </div>

          <div className="mt-8 flex gap-4">

            <input
              value={location}
              onChange={(e)=>setLocation(e.target.value)}
              placeholder="Search location..."
              className="flex-1 rounded-xl border p-3"
            />
            <input
  type="number"
  min={1}
  value={guests}
  onChange={(e) =>
    setGuests(Number(e.target.value))
  }
  placeholder="Guests"
  className="w-36 rounded-xl border p-3"
/>

            <button
  onClick={search}
  className="rounded-xl bg-rose-500 px-8 py-3 text-white font-semibold hover:bg-rose-600 transition"
>
  Search
</button>

            <button
  onClick={() => {
    setLocation("");
    setGuests(1);
    setSelectedType("");
    loadAll();
  }}
  className="rounded-xl border border-gray-300 px-8 hover:bg-gray-100 transition"
>
  Clear
</button>

          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">

  {categoryChips.map((chip) => (

    <button
      key={chip}
      onClick={() => {
        setSelectedType(chip);

        searchListings(
          location,
          chip,
          guests
        ).then(setListings);
      }}
      className={`rounded-full border px-5 py-2 transition-all ${
        selectedType === chip
          ? "bg-black text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {chip}
    </button>

  ))}

  <select
    value=""
    onChange={(e) => {
      const value = e.target.value;

      if (!value) return;

      setSelectedType(value);

      searchListings(
        location,
        value,
        guests
      ).then(setListings);
    }}
    className="rounded-full border px-4 py-2"
  >
    <option value="">More ▼</option>

    {moreCategories.map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}

  </select>

</div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">

        {loading ? (

          <div className="py-24 text-center">
            Loading...
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

            {listings.map((listing)=>(

              <ListingCard
                key={listing.id}
                listing={listing}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}