export interface HealthResponse {
  status: string;
  service: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  property_type: string;
  image_url: string;
  price_per_night: number;

  rating: number;
  reviews_count: number;

  bedrooms: number;
  bathrooms: number;
  beds: number;
  max_guests: number;

  wifi: boolean;
  kitchen: boolean;
  parking: boolean;
  pool: boolean;
  air_conditioning: boolean;
}