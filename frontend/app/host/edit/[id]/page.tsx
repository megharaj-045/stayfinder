"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import {
  getListing,
  updateListing,
} from "@/lib/api";

export default function EditListing() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    property_type: "Apartment",
    image_url: "",
    price_per_night: 1000,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    max_guests: 2,
  });

  useEffect(() => {
    if (!id) return;

    getListing(id).then((listing) => {
      setForm({
        title: listing.title,
        description: listing.description,
        location: listing.location,
        property_type: listing.property_type,
        image_url: listing.image_url,
        price_per_night: listing.price_per_night,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        beds: listing.beds,
        max_guests: listing.max_guests,
      });
    });
  }, [id]);

  async function submit() {
    await updateListing(id, {
      ...form,

      rating: 4.8,
      reviews_count: 0,

      wifi: true,
      kitchen: true,
      parking: true,
      pool: false,
      air_conditioning: true,

      host_id: 1,
    });

    alert("Listing Updated!");

    router.push("/host");
  }

  return (
    <main className="mx-auto max-w-3xl p-10">

      <h1 className="mb-8 text-4xl font-bold">
        Edit Listing
      </h1>

      <div className="space-y-4">

        <input
          value={form.title}
          placeholder="Title"
          className="w-full rounded border p-3"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          value={form.description}
          placeholder="Description"
          className="w-full rounded border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          value={form.location}
          placeholder="Location"
          className="w-full rounded border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <input
          value={form.image_url}
          placeholder="Image URL"
          className="w-full rounded border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              image_url: e.target.value,
            })
          }
        />

        <input
          value={form.price_per_night}
          type="number"
          placeholder="Price"
          className="w-full rounded border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              price_per_night: Number(e.target.value),
            })
          }
        />

        <button
          onClick={submit}
          className="w-full rounded-xl bg-blue-600 py-4 text-white hover:bg-blue-700"
        >
          Update Listing
        </button>

      </div>

    </main>
  );
}