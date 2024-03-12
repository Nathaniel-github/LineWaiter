import './listing.css'

const MyListingsListing = ({ _id, title, location, time, duration, price, description, username }) => {
    const handleDeleteClick = (e) => {
        try {
            const response = fetch('/deleteAListing/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id}),
            });

 } catch (error) {
            console.error('Error:', error);
        }
    };


        return (
            <>
                <section className="listing-container">
                    <section className="listing">
                        <h3 className="listing-title">{title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">{location}</h2>
                            <h2 className="listing-subtext">{time}</h2>
                            <h2 className="listing-subtext">{duration}</h2>
                            <h2 className="listing-subtext">{price}</h2>
                            <h2 className="listing-subtext">{description}</h2>
                        </section>
                        <br/>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Delete Listing</button>
                        </div>
                    </section>
                </section>
            </>
        )
    };


export default MyListingsListing;