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
    id: "tamarindo-ocean-villa",
    name: "Tamarindo Ocean Villa",
    address: "Calle Cardinal, Playa Tamarindo",
    city: "Tamarindo",
    country: "Costa Rica",
    shortDescription: "Beachside villa with palm views, open-air living, and quick surf access.",
    description:
      "A bright Guanacaste villa designed for relaxed coastal stays. The home includes open-air social spaces, tropical landscaping, fast Wi-Fi, secure parking, and easy access to Tamarindo restaurants, surf lessons, and sunset walks on the beach.",
    price: 315,
    imageUrl:
      "https://images.pexels.com/photos/17311460/pexels-photo-17311460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    latitude: 10.2993,
    longitude: -85.8371,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    status: "Available",
  },
  {
    id: "arenal-rainforest-lodge",
    name: "Arenal Rainforest Lodge",
    address: "Camino al Volcán, La Fortuna",
    city: "La Fortuna",
    country: "Costa Rica",
    shortDescription: "Rainforest lodge framed by volcano views, gardens, and hot spring routes.",
    description:
      "A warm mountain lodge near Arenal Volcano with covered terraces, lush gardens, a dedicated workspace, and easy routes to hot springs, hanging bridges, waterfalls, and guided rainforest tours.",
    price: 245,
    imageUrl:
      "https://images.unsplash.com/photo-1683064772054-d05a05efbed1?auto=format&fit=crop&w=1200&q=80",
    latitude: 10.4678,
    longitude: -84.6427,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    status: "Booked",
  },
  {
    id: "santa-teresa-surf-house",
    name: "Santa Teresa Surf House",
    address: "Ruta 160, Playa Santa Teresa",
    city: "Santa Teresa",
    country: "Costa Rica",
    shortDescription: "Laid-back surf house surrounded by palms and minutes from the Pacific.",
    description:
      "A casual-yet-polished surf house for guests who want privacy, outdoor dining, board storage, and walkable access to Santa Teresa cafes, yoga studios, beach clubs, and consistent Pacific breaks.",
    price: 285,
    imageUrl:
      "https://images.unsplash.com/photo-1687276703018-5d96a65f29b4?auto=format&fit=crop&w=1200&q=80",
    latitude: 9.6457,
    longitude: -85.1688,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    status: "Available",
  },
  {
    id: "monteverde-cloud-forest-cabin",
    name: "Monteverde Cloud Forest Cabin",
    address: "Cerro Plano Road, Monteverde",
    city: "Monteverde",
    country: "Costa Rica",
    shortDescription: "Quiet cabin near cloud forest trails, birdwatching, and cool mountain air.",
    description:
      "A cozy cloud forest cabin with mountain views, a reading nook, efficient kitchenette, and a covered deck for rainy afternoons. The location is ideal for nature-focused travelers visiting reserves, canopy tours, and local coffee farms.",
    price: 178,
    imageUrl:
      "https://images.unsplash.com/photo-1649689727213-9842bb6fe095?auto=format&fit=crop&w=1200&q=80",
    latitude: 10.3000,
    longitude: -84.8167,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    status: "Available",
  },
  {
    id: "manuel-antonio-jungle-retreat",
    name: "Manuel Antonio Jungle Retreat",
    address: "Quepos-Manuel Antonio Road",
    city: "Manuel Antonio",
    country: "Costa Rica",
    shortDescription: "Tropical retreat with jungle greenery, wildlife sightings, and beach access.",
    description:
      "A comfortable jungle retreat built for families and small groups visiting Manuel Antonio. Guests can enjoy shaded outdoor seating, air-conditioned bedrooms, a compact kitchen, and quick access to beaches, national park trails, restaurants, and marina activities.",
    price: 260,
    imageUrl:
      "https://images.unsplash.com/photo-1726165815011-b7f0477e7f0b?auto=format&fit=crop&w=1200&q=80",
    latitude: 9.3923,
    longitude: -84.1367,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    status: "Maintenance",
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}
