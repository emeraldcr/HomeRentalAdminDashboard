import Link from "next/link";
import type { RentalProperty } from "@/data/properties";

export function PropertyCard({ property }: { property: RentalProperty }) {
  return (
    <article className="property-card">
      <img src={property.imageUrl} alt={`${property.name} exterior`} />
      <div className="property-card__body">
        <div className="property-card__heading">
          <div>
            <h2>{property.name}</h2>
            <p>{property.address}, {property.city}</p>
          </div>
          <span className={`status status--${property.status.toLowerCase()}`}>{property.status}</span>
        </div>
        <p className="property-card__description">{property.shortDescription}</p>
        <div className="property-card__footer">
          <strong>${property.price}<span>/night</span></strong>
          <Link className="button button--primary" href={`/properties/${property.id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
