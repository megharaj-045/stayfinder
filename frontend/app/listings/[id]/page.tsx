"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Wifi,
  Car,
  ChefHat,
  Waves,
  Users,
  BedDouble,
  Bath,
} from "lucide-react";

import { createBooking, getListing } from "@/lib/api";
import type { Listing } from "@/types/api";

export default function ListingDetailsPage() {

  const params = useParams();
  const id = Number(params.id);

  const [listing, setListing] =
    useState<Listing | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getListing(id);

        setListing(data);

      } finally {

        setLoading(false);

      }

    }

    if(id){

      load();

    }

  },[id]);

  async function reserve(){


    if(!listing) return;
    if (guests > listing.max_guests) {
    alert(
      `Maximum ${listing.max_guests} guests are allowed for this property.`
    );
    return;
  }

    const start =
      new Date(checkIn);

    const end =
      new Date(checkOut);

    const nights=Math.max(
      1,
      (end.getTime()-start.getTime())/
      (1000*60*60*24)
    );

    const total=
      nights*
      listing.price_per_night;

    try{

      await createBooking({
        

        user_id:1,

        listing_id:listing.id,

        check_in:checkIn,

        check_out:checkOut,

        guests,

        total_price:total,

      });

      alert("Booking Successful 🎉");

    }

    catch (err: any) {
  alert("Selected dates are unavailable. Please choose another date range.");
}

  }

  if(loading){

    return(

      <main className="mx-auto max-w-7xl py-20 text-center">

        Loading...

      </main>

    );

  }

  if(!listing){

    return(

      <main className="mx-auto max-w-7xl py-20 text-center">

        Listing not found.

      </main>

    );

  }

  return(

    <main className="mx-auto max-w-7xl px-6 py-10">

      <h1 className="text-5xl font-bold">

        {listing.title}

      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-5">

        <div className="flex items-center gap-2">

          <Star
            size={18}
            fill="black"
          />

          {listing.rating}

        </div>

        <span>

          {listing.location}

        </span>

      </div>

      <img

        src={listing.image_url}

        alt={listing.title}

        className="mt-8 h-[550px] w-full rounded-3xl object-cover"

      />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <h2 className="text-3xl font-bold">

            Entire {listing.property_type}

          </h2>

          <div className="mt-6 flex flex-wrap gap-6">

            <div className="flex items-center gap-2">

              <BedDouble size={20}/>

              {listing.bedrooms} Bedrooms

            </div>

            <div className="flex items-center gap-2">

              <Bath size={20}/>

              {listing.bathrooms} Bathrooms

            </div>

            <div className="flex items-center gap-2">

              <Users size={20}/>

              {listing.max_guests} Guests

            </div>

          </div>

          <hr className="my-8"/>

          <p className="leading-8 text-gray-600">

            {listing.description}

          </p>

          <hr className="my-8"/>

          <h3 className="mb-6 text-2xl font-bold">

            What this place offers

          </h3>
                    <div className="grid gap-5 md:grid-cols-2">

            {listing.wifi && (
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Wifi size={22} />
                <span>High-speed WiFi</span>
              </div>
            )}

            {listing.kitchen && (
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <ChefHat size={22} />
                <span>Kitchen</span>
              </div>
            )}

            {listing.parking && (
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Car size={22} />
                <span>Free Parking</span>
              </div>
            )}

            {listing.pool && (
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Waves size={22} />
                <span>Swimming Pool</span>
              </div>
            )}

          </div>
          <hr className="my-10" />

<h3 className="text-2xl font-bold">
  Guest Reviews
</h3>

<div className="mt-6 space-y-5">

  <div className="rounded-2xl border p-5">
    <div className="text-yellow-500 text-xl">
      ⭐⭐⭐⭐⭐
    </div>

    <h4 className="mt-2 font-semibold">
      Rahul Sharma
    </h4>

    <p className="mt-2 text-gray-600">
      Amazing stay! Very clean, peaceful and exactly like the photos.
    </p>
  </div>

  <div className="rounded-2xl border p-5">
    <div className="text-yellow-500 text-xl">
      ⭐⭐⭐⭐☆
    </div>

    <h4 className="mt-2 font-semibold">
      Priya Nair
    </h4>

    <p className="mt-2 text-gray-600">
      Great location with excellent amenities. Would definitely visit again.
    </p>
  </div>

  <div className="rounded-2xl border p-5">
    <div className="text-yellow-500 text-xl">
      ⭐⭐⭐⭐⭐
    </div>

    <h4 className="mt-2 font-semibold">
      Arjun Patel
    </h4>

    <p className="mt-2 text-gray-600">
      One of the best stays I've booked. Highly recommended!
    </p>
  </div>

</div>

        </div>

        <div>

          <div className="sticky top-28 rounded-3xl border bg-white p-7 shadow-xl">

            <h2 className="text-4xl font-bold">

              ₹{listing.price_per_night}

              <span className="text-lg font-normal">
                {" "}night
              </span>

            </h2>

            <div className="mt-8 space-y-4">

              <input
                type="date"
                value={checkIn}
                onChange={(e)=>setCheckIn(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <input
                type="date"
                value={checkOut}
                onChange={(e)=>setCheckOut(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

              <input
                type="number"
                min={1}
                value={guests}
                onChange={(e)=>setGuests(Number(e.target.value))}
                className="w-full rounded-xl border p-3"
              />

              <button
                onClick={reserve}
                className="w-full rounded-xl bg-rose-500 py-4 text-lg font-semibold text-white transition hover:bg-rose-600"
              >
                Reserve
              </button>

            </div>
            <hr className="my-6" />

<div className="mt-8 rounded-2xl bg-gray-50 p-5">

  <div className="flex justify-between">
    <span>₹{listing.price_per_night} × 1 night</span>
    <span>₹{listing.price_per_night}</span>
  </div>

  <div className="mt-3 flex justify-between">
    <span>Cleaning fee</span>
    <span>₹500</span>
  </div>

  <div className="mt-3 flex justify-between">
    <span>Service fee</span>
    <span>₹300</span>
  </div>

  <hr className="my-4" />

  <div className="flex justify-between text-lg font-bold">
    <span>Total</span>
    <span>₹{listing.price_per_night + 800}</span>
  </div>

  <hr className="my-4" />

  <div className="flex justify-between">
    <span>Maximum Guests</span>
    <span>{listing.max_guests}</span>
  </div>

</div>

          </div>

        </div>

      </div>

    </main>

  );

}
<div className="my-8 flex items-center gap-4 rounded-xl border p-4">
  <img
    src="https://i.pravatar.cc/100"
    alt="Host"
    className="h-16 w-16 rounded-full"
  />

  <div>
    <h3 className="font-bold text-lg">Hosted by John</h3>
    <p className="text-gray-500">
      Superhost • Hosting for 4 years
    </p>
  </div>
</div>

