export type RentalProperty = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  shortDescription: string;
  description: string;
  price: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  status: "Available" | "Booked" | "Maintenance";
};

export const properties: RentalProperty[] = [
  {
    id: "pacific-heights-retreat",
    name: "Pacific Heights Retreat",
    address: "2218 Vallejo Street",
    city: "San Francisco",
    country: "USA",
    shortDescription: "Bright Victorian apartment close to parks, cafes, and bay views.",
    description:
      "A polished two-bedroom Victorian retreat with period details, a renovated kitchen, fast Wi-Fi, and a quiet patio. Ideal for business travelers or couples who want an elevated San Francisco stay near restaurants, green space, and the waterfront.",
    price: 289,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    latitude: 37.7946,
    longitude: -122.4348,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    status: "Available",
  },
  {
    id: "austin-lake-house",
    name: "Austin Lake House",
    address: "4100 Rivercrest Drive",
    city: "Austin",
    country: "USA",
    shortDescription: "Modern lakeside home with a deck, open kitchen, and sunset views.",
    description:
      "This spacious lake house pairs relaxed Texas charm with modern finishes. Guests can enjoy a chef-friendly kitchen, dedicated workspace, oversized deck, paddleboard storage, and quick access to downtown Austin.",
    price: 335,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    latitude: 30.3066,
    longitude: -97.7848,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    status: "Booked",
  },
  {
    id: "brooklyn-loft",
    name: "Brooklyn Loft",
    address: "88 North 6th Street",
    city: "New York",
    country: "USA",
    shortDescription: "Industrial loft with skyline views in the heart of Williamsburg.",
    description:
      "A design-forward loft featuring exposed brick, tall windows, curated local art, and a flexible living area for work or entertaining. The location is walkable to restaurants, subway lines, music venues, and the East River ferry.",
    price: 410,
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    latitude: 40.7216,
    longitude: -73.9585,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    status: "Available",
  },
  {
    id: "scottsdale-casita",
    name: "Scottsdale Desert Casita",
    address: "7420 East Main Street",
    city: "Scottsdale",
    country: "USA",
    shortDescription: "Private casita with pool access, desert landscaping, and mountain light.",
    description:
      "A serene casita designed for restorative desert getaways. Highlights include a private entrance, kitchenette, shared pool courtyard, blackout curtains, and easy access to Old Town Scottsdale, golf, hiking, and spas.",
    price: 198,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    latitude: 33.4936,
    longitude: -111.9259,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    status: "Available",
  },
  {
    id: "miami-beach-condo",
    name: "Miami Beach Condo",
    address: "1458 Ocean Drive",
    city: "Miami Beach",
    country: "USA",
    shortDescription: "Ocean-facing condo steps from sand, dining, and nightlife.",
    description:
      "A crisp beach condo with balcony seating, resort-style amenities, and an efficient floor plan for short stays. Guests are minutes from the sand, Art Deco landmarks, restaurants, and South Beach entertainment.",
    price: 265,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    latitude: 25.7867,
    longitude: -80.1300,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    status: "Maintenance",
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}
