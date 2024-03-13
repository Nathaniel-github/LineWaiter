// ListingDetails.jsx
import React from 'react';

const ListingDetails = ({ listing }) => {
  return (
    <div className="listing-details">
      <h2>{listing.title}</h2>
      <p>Location: {listing.location}</p>
      <p>Time: {listing.time}</p>
      <p>Duration: {listing.duration}</p>
      <p>Price: {listing.price}</p>
      <p>Description: {listing.description}</p>
      {/* Add any other details you want to display */}
    </div>
  );
};

export default ListingDetails;
