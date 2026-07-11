import Link from "next/link";
import {
  Heart,
  Home,
  BriefcaseBusiness,
  User,
  Plane,
} from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-rose-500"
        >
          <Home size={28} />
          StayFinder
        </Link>

        <nav className="flex items-center gap-8">

  <Link
    href="/wishlist"
    className="flex items-center gap-2 hover:text-rose-500"
  >
    <Heart size={20} />
    Wishlist
  </Link>

  <Link
    href="/trips"
    className="flex items-center gap-2 hover:text-rose-500"
  >
    <Plane size={20} />
    Trips
  </Link>

  <Link
    href="/host"
    className="flex items-center gap-2 hover:text-rose-500"
  >
    <BriefcaseBusiness size={20} />
    Host
  </Link>

  <button className="flex items-center gap-2 rounded-full border px-5 py-2 font-medium transition hover:bg-gray-100">
    <User size={18} />
    Guest
  </button>

</nav>

      </div>

    </header>
  );
}