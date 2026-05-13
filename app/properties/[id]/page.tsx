import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WeatherCard } from "@/components/WeatherCard";
import { getPropertyById, properties } from "@/data/properties";

type PropertyDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Link className="back-link" href="/">← Back to dashboard</Link>
        <article className="detail-layout">
          <section className="detail-card">
            <img className="detail-image" src={property.imageUrl} alt={`${property.name} exterior`} />
            <div className="detail-content">
              <div className="detail-title-row">
                <div>
                  <p className="eyebrow">Property details</p>
                  <h2>{property.name}</h2>
                  <p>{property.address}, {property.city}, {property.country}</p>
                </div>
                <span className={`status status--${property.status.toLowerCase()}`}>{property.status}</span>
              </div>
              <p className="detail-description">{property.description}</p>
              <dl className="metadata-grid">
                <div>
                  <dt>Nightly rate</dt>
                  <dd>${property.price}</dd>
                </div>
                <div>
                  <dt>Bedrooms</dt>
                  <dd>{property.bedrooms}</dd>
                </div>
                <div>
                  <dt>Bathrooms</dt>
                  <dd>{property.bathrooms}</dd>
                </div>
                <div>
                  <dt>Max guests</dt>
                  <dd>{property.maxGuests}</dd>
                </div>
              </dl>
            </div>
          </section>
          <WeatherCard city={property.city} latitude={property.latitude} longitude={property.longitude} />
        </article>
      </Layout>
    </ProtectedRoute>
  );
}
