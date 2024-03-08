import './listing.css'

const Listing = ({ title, location, time, duration, price, description }) => {
    return (
        <>
            <section className="listing-container">
                <section className="listing">
                    <h3 className="listing-title">{title}</h3>
                    <h2 className="listing-subtext">{location}</h2>
                    <h2 className="listing-subtext">{time}</h2>
                    <h2 className="listing-subtext">{duration}</h2>
                    <h2 className="listing-subtext">{price}</h2>
                    <h2 className="listing-subtext">{description}</h2>
                </section>
            </section>
        </>
    )
}

export default Listing;