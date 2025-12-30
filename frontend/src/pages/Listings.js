import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import "../styles/main.css";

export default function Listings() {
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "BUY",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: "",
    maxPrice: "",
    bedrooms: ""
  });

  const [page, setPage] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, [page]);

  const fetchProperties = async () => {
    setLoading(true);

    const query = new URLSearchParams({
      ...filters,
      page,
      size: pageSize
    }).toString();

    const res = await fetch(
      `http://localhost:8080/api/properties/search?${query}`
    );

    const data = await res.json();
    setProperties(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPage(0);
    fetchProperties();
  };

  return (
    <div className="listings-page">
      {/* FILTER PANEL */}
      <aside className="filters">
        <h3>Filter Properties</h3>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />

        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="BUY">Buy</option>
          <option value="RENT">Rent</option>
        </select>

        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
        >
          <option value="">All Types</option>
          <option value="CONDO">Condo</option>
          <option value="HDB">HDB</option>
          <option value="LANDED">Landed</option>
        </select>

        <select
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
        >
          <option value="">Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <button onClick={applyFilters}>Apply Filters</button>
      </aside>

      {/* RESULTS */}
      <section className="results">
        <h2>Property Listings</h2>

        {loading && <p>Loading properties...</p>}

        <div className="property-grid">
          {properties.length === 0 && !loading && (
            <p>No properties found</p>
          )}

          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>Page {page + 1}</span>

          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </section>
    </div>
  );
}
