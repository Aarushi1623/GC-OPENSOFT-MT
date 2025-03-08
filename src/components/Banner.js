import React, { useState } from "react";
import "../css/Banner.css";

function Banner({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); // Send query to App.js
    }
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1><b>Get Latest News</b></h1> 
        <h4>Stay ahead with real-time updates, anytime, anywhere!</h4>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
