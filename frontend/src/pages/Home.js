import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import "../styles/main.css";

export default function Home() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState({
    location: "",
    type: "BUY",
    propertyType: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data.slice(0, 6))); // featured
  }, []);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    navigate(
      `/listings?location=${search.location}&type=${search.type}&propertyType=${search.propertyType}`
    );
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Dream Home</h1>
          <p>Buy, Rent or Sell properties across Singapore</p>

          <div className="search-box">
            <input
              type="text"
              name="location"
              placeholder="Enter city, MRT, area"
              value={search.location}
              onChange={handleChange}
            />

            <select name="type" onChange={handleChange}>
              <option value="BUY">Buy</option>
              <option value="RENT">Rent</option>
            </select>

            <select name="propertyType" onChange={handleChange}>
              <option value="">Property Type</option>
              <option value="CONDO">Condo</option>
              <option value="HDB">HDB</option>
              <option value="LANDED">Landed</option>
            </select>

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="featured-section">
        <h2>Featured Properties</h2>

        <div className="property-grid">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="view-all">
          <button onClick={() => navigate("/listings")}>
            View All Properties
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="why-card">
          <h3>🏠 Verified Listings</h3>
          <p>All properties are verified by our agents</p>
        </div>

        <div className="why-card">
          <h3>📍 Prime Locations</h3>
          <p>Search near MRTs, schools and business hubs</p>
        </div>

        <div className="why-card">
          <h3>🔒 Secure Deals</h3>
          <p>Trusted platform with secure transactions</p>
        </div>
      </section>
    </>
  );
}
