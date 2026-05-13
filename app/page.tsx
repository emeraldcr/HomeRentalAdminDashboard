import { Layout } from "@/components/Layout";
import { PropertyGrid } from "@/components/PropertyGrid";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { properties } from "@/data/properties";

export default function DashboardPage() {
  const availableCount = properties.filter((property) => property.status === "Available").length;
  const averageNightlyRate = Math.round(
    properties.reduce((total, property) => total + property.price, 0) / properties.length,
  );

  return (
    <ProtectedRoute>
      <Layout>
        <section className="hero-panel">
          <div>
            <p className="eyebrow">Portfolio overview</p>
            <h2>Rental properties</h2>
            <p>
              Review active homes, open detailed property records, and validate location weather before guest arrival.
            </p>
          </div>
          <div className="stats-grid" aria-label="Portfolio stats">
            <div>
              <span>{properties.length}</span>
              <p>Total homes</p>
            </div>
            <div>
              <span>{availableCount}</span>
              <p>Available</p>
            </div>
            <div>
              <span>${averageNightlyRate}</span>
              <p>Avg. nightly rate</p>
            </div>
          </div>
        </section>
        <PropertyGrid properties={properties} />
      </Layout>
    </ProtectedRoute>
  );
}
