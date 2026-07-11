import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-gray-50">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 py-12 md:grid-cols-4">

        <div>

          <h2 className="mb-4 text-xl font-bold text-rose-500">
            StayFinder
          </h2>

          <p className="text-gray-600">
            Find unique stays, book unforgettable
            experiences and travel with comfort.
          </p>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            Explore
          </h3>

          <div className="space-y-2 text-gray-600">

            <Link href="/">Home</Link>

            <br />

            <Link href="/wishlist">Wishlist</Link>

            <br />

            <Link href="/trips">Trips</Link>

          </div>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            Hosting
          </h3>

          <div className="space-y-2 text-gray-600">

            <Link href="/host">
              Host Dashboard
            </Link>

            <br />

            <Link href="/host/add">
              Add Listing
            </Link>

          </div>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            About
          </h3>

          <p className="text-gray-600">
            StayFinder is an Airbnb-inspired
            marketplace built using
            FastAPI + Next.js.
          </p>

        </div>

      </div>

      <div className="border-t py-5 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} StayFinder.
        All rights reserved.

      </div>

    </footer>
  );
}