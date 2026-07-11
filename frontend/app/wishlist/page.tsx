"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Trash2, IndianRupee } from "lucide-react";

import {
  getListings,
  getWishlist,
  deleteWishlist,
} from "@/lib/api";

import type { Listing } from "@/types/api";

export default function WishlistPage() {

  const [listings, setListings] = useState<Listing[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadWishlist() {

      const wish = await getWishlist();
      setWishlist(wish);

      const all = await getListings();

      setListings(
        all.filter((l)=>
          wish.some((w)=>w.listing_id===l.id)
        )
      );

      setLoading(false);

    }

    loadWishlist();

  }, []);

  if(loading){

    return(

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-4xl font-bold">
          Wishlist ❤️
        </h1>

        <p className="mt-6">
          Loading...
        </p>

      </main>

    );

  }

  return(

    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Wishlist ❤️
        </h1>

        <p className="mt-2 text-gray-500">
          Your favourite stays in one place.
        </p>

      </div>

      {listings.length===0 ? (

        <div className="rounded-3xl border border-dashed py-24 text-center">

          <Heart
            className="mx-auto mb-5"
            size={60}
          />

          <h2 className="text-3xl font-bold">
            No Saved Listings
          </h2>

          <p className="mt-3 text-gray-500">
            Start exploring and save your favourite stays.
          </p>

        </div>

      ):(

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {listings.map((listing)=>{

            const wish=wishlist.find(
              (w)=>w.listing_id===listing.id
            );

            return(

              <div
                key={listing.id}
                className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <Link href={`/listings/${listing.id}`}>

                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="h-64 w-full object-cover"
                  />

                </Link>

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {listing.title}
                  </h2>

                  <div className="mt-3 flex items-center gap-2 text-gray-500">

                    <MapPin size={16}/>
                    {listing.location}

                  </div>

                  <div className="mt-3 flex items-center gap-2 font-semibold">

                    <IndianRupee size={16}/>
                    ₹{listing.price_per_night}/night

                  </div>

                  <button

                    onClick={async()=>{

                      if(!wish) return;

                      await deleteWishlist(wish.id);

                      setListings(prev=>
                        prev.filter(
                          l=>l.id!==listing.id
                        )
                      );

                      setWishlist(prev=>
                        prev.filter(
                          w=>w.id!==wish.id
                        )
                      );

                    }}

                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"

                  >

                    <Trash2 size={18}/>
                    Remove

                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </main>

  );

}