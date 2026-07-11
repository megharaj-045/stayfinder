"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Users, IndianRupee } from "lucide-react";

import { getBookings } from "@/lib/api";

export default function Trips() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          My Trips
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your upcoming bookings.
        </p>

      </div>

      {bookings.length === 0 ? (

        <div className="rounded-2xl border border-dashed py-24 text-center">

          <h2 className="text-2xl font-semibold">
            No Trips Yet ✈️
          </h2>

          <p className="mt-3 text-gray-500">
            Book your first stay to see it here.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="flex flex-col justify-between gap-6 md:flex-row">

                <div>

                  <h2 className="text-2xl font-bold">
                    Booking #{booking.id}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Listing ID: {booking.listing_id}
                  </p>

                </div>

                <div className="grid gap-4 text-sm">

                  <div className="flex items-center gap-3">

                    <CalendarDays size={18} />

                    <span>
                      {booking.check_in}
                    </span>

                    <span>→</span>

                    <span>
                      {booking.check_out}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Users size={18} />

                    <span>
                      {booking.guests} Guests
                    </span>

                  </div>

                  <div className="flex items-center gap-3 font-semibold text-lg">

                    <IndianRupee size={18} />

                    ₹{booking.total_price}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}