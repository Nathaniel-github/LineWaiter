const Listing = ({ name, where, when, price, duration }) => {
  return (
    <>
      <section className="listing">
          <div className="listing-details">
              <h3 className="listing-name">{name}</h3>
              <h2 className="listing-location">{where}</h2>
              <h2 className="listing-time">{when}</h2>
              <h2 className="listing-price">{price}</h2>
              <h2 className="listing-duration">{duration}</h2>
          </div>
      </section>
    </>
  );
};

export default Listing;