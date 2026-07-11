"use client";

import Link from "next/link";
import { Heart, Star, MapPin } from "lucide-react";

import { addToWishlist } from "@/lib/api";
import { Listing } from "@/types/listing";

type Props = {
  listing: Listing;
};

export default function ListingCard({ listing }: Props) {

  async function saveWishlist(
    e: React.MouseEvent
  ) {

    e.preventDefault();

    try {

      await addToWishlist({
        user_id: 1,
        listing_id: listing.id,
      });

      alert("❤️ Added to Wishlist");

    } catch {

      alert("Already in Wishlist");

    }

  }

  return (

    <Link href={`/listings/${listing.id}`}>

      <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-2xl">

        <div className="relative overflow-hidden">

          <img
            src={listing.image_url}
            alt={listing.title}
            className="aspect-square w-full object-cover transition duration-500 ease-out group-hover:scale-110"
          />

          <button

            onClick={saveWishlist}

            className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg transition hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sf-brand/20"

          >

            <Heart size={20}/>

          </button>

        </div>

        <div className="p-5">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold leading-snug">
              {listing.title}
            </h2>

            <div className="flex items-center gap-1">

              <Star
                size={16}
                fill="black"
              />

              {listing.rating}

            </div>

          </div>

          <div className="mt-3 flex items-center gap-2 text-gray-500">

            <MapPin size={16}/>

            {listing.location}

          </div>

          <p className="mt-2 text-sm text-gray-500">

            {listing.property_type}

          </p>

          <div className="mt-5 flex items-center justify-between">

            <p className="flex items-baseline gap-1 font-bold">

              <span className="text-xl leading-none">₹{listing.price_per_night}</span>

              <span className="text-sm font-normal text-gray-500">night</span>

            </p>

            <button className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/20">
              View
            </button>

          </div>

        </div>

      </article>

    </Link>

  );

}