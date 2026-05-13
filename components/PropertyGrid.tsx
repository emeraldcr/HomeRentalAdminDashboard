import type { RentalProperty } from "@/data/properties";
import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }: { properties: RentalProperty[] }) {
  return (
    <section className="property-grid" aria-label="Rental properties">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}
