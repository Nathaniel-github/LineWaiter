import styles from "./styles.module.css";
import { useState } from "react";

import nav from "../navbar/navbar";
import listings from "../listing/listing";
import listing_data from "../listing/listing_data";
import "./index.css";
import listing from "../listing/listing";
import Listing_data from "../listing/listing_data";
import Listings from "../listing/listing";
import Navbar from "../navbar/navbar";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = listing.filter(
    (listing) => listing.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(listings, selected, query) {
    let filteredListings = listings;

    // Filtering Input Items
    if (query) {
      filteredListings = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredListings = filteredListings.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredListings.map(
      ({ name, where, when, price, duration }) => (
        <Listing_data
          key={Math.random()}
          name={name}
          where={where}
          when={when}
          price={price}
          duration={duration}
        />
      )
    );
  }

  const result = filteredData(listings, selectedCategory, query);

  return (
    <>
      <Navbar query={query} handleInputChange={handleInputChange} />
      <Listings result={result} />
    </>
  );
}

export default HomePage;
