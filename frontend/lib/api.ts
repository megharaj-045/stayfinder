import type { HealthResponse, Listing } from "@/types/api";

const DEFAULT_API_BASE = "http://localhost:8000";

function resolveApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE;
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const baseUrl = resolveApiBaseUrl().replace(/\/$/, "");

  const response = await fetch(
    `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    },
  );

  const contentType = response.headers.get("content-type") ?? "";

  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status,
      body,
    );
  }

  return body as T;
}

export function getHealth(): Promise<HealthResponse> {
  return apiFetch("/api/v1/health");
}

export function getListings(): Promise<Listing[]> {
  return apiFetch("/api/v1/listings");
}

export function getListing(id: number): Promise<Listing> {
  return apiFetch(`/api/v1/listings/${id}`);
}

export function searchListings(
  location?: string,
  propertyType?: string,
  guests?: number,
): Promise<Listing[]> {

  const params = new URLSearchParams();

  if (location)
    params.append("location", location);

  if (propertyType)
    params.append("property_type", propertyType);
  if (guests)
  params.append("guests", guests.toString());

  return apiFetch(
    `/api/v1/listings/search?${params.toString()}`
  );

}

export interface BookingCreate {
  user_id: number;
  listing_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
}

export function createBooking(
  booking: BookingCreate,
) {
  return apiFetch("/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
  });
}

export interface Booking {
  id: number;
  listing_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
}

export function getBookings(): Promise<Booking[]> {
  return apiFetch("/api/v1/bookings");
}

export interface WishlistCreate {
  user_id: number;
  listing_id: number;
}

export function addToWishlist(
  wishlist: WishlistCreate,
) {
  return apiFetch("/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify(wishlist),
  });
}

export interface WishlistItem {
  id: number;
  user_id: number;
  listing_id: number;
}

export function getWishlist(): Promise<WishlistItem[]> {
  return apiFetch("/api/v1/wishlist");
}

export function deleteWishlist(id: number) {
  return apiFetch(`/api/v1/wishlist/${id}`, {
    method: "DELETE",
  });
}

export function updateListing(
  id: number,
  listing: any,
) {
  return apiFetch(`/api/v1/listings/${id}`, {
    method: "PUT",
    body: JSON.stringify(listing),
  });
}