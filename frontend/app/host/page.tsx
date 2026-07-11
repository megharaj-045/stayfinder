"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, MapPin, Trash2, IndianRupee } from "lucide-react";
import { Pencil } from "lucide-react";

import { getListings } from "@/lib/api";
import type { Listing } from "@/types/api";

export default function HostDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    getListings().then(setListings);
  }, []);

  async function deleteListing(id: number) {
    const ok = confirm("Delete this listing?");

    if (!ok) return;

    await fetch(
      `http://localhost:8000/api/v1/listings/${id}`,
      {
        method: "DELETE",
      }
    );

    setListings((prev) =>
      prev.filter((listing) => listing.id !== id)
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex flex-wrap items-center justify-between gap-5">

        <div>

          <h1 className="text-4xl font-bold">
            Host Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage all your property listings.
          </p>

        </div>

        <Link
          href="/host/add"
          className="rounded-xl bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600"
        >
          + Add Listing
        </Link>

      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border p-6 shadow-sm">

          <h3 className="text-gray-500">
            Total Listings
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {listings.length}
          </p>

        </div>

        <div className="rounded-2xl border p-6 shadow-sm">

          <h3 className="text-gray-500">
            Average Price
          </h3>

          <p className="mt-3 text-4xl font-bold">
            ₹
            {listings.length
              ? Math.round(
                  listings.reduce(
                    (sum, l) => sum + l.price_per_night,
                    0
                  ) / listings.length
                )
              : 0}
          </p>

        </div>

        <div className="rounded-2xl border p-6 shadow-sm">

          <h3 className="text-gray-500">
            Highest Rating
          </h3>

          <p className="mt-3 text-4xl font-bold">
            {listings.length
              ? Math.max(...listings.map((l) => l.rating))
              : "-"}
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {listings.map((listing) => (

          <div
            key={listing.id}
            className="flex flex-col justify-between gap-5 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center"
          >

            <div className="flex items-center gap-5">

              <img
                src={listing.image_url}
                alt={listing.title}
                className="h-28 w-36 rounded-xl object-cover"
              />

              <div>

                <h2 className="text-xl font-bold">
                  {listing.title}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-gray-500">

                  <MapPin size={16} />

                  {listing.location}

                </div>

                <div className="mt-2 flex items-center gap-2">

                  <Home size={16} />

                  {listing.property_type}

                </div>

                <div className="mt-2 flex items-center gap-2 font-semibold">

                  <IndianRupee size={16} />

                  ₹{listing.price_per_night}/night

                </div>

              </div>

            </div>
            <Link
  href={`/host/edit/${listing.id}`}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
>
  <Pencil size={18} />
  Edit
</Link>

            <button
              onClick={() => deleteListing(listing.id)}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600"
            >
              <Trash2 size={18} />
              Delete
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}