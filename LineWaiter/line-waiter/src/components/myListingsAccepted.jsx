import './listing.css'

const MyListingsAccepted = ({ _id, title, location, time, duration, price, description, username }) => {
    const handleDeleteClick = (e) => {


        try {
            const response = fetch('/unAcceptListing/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id}),

            });

            window.location.reload();

 } catch (error) {
            console.error('Error:', error);
        }
    };


        return (
            <>
                <section className="listing-container">
                    <section className="listing">
                        <h3 className="listing-title">title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">location: {location}</h2>
                            <h2 className="listing-subtext">time: {time}</h2>
                            <h2 className="listing-subtext">duration in minutes: {duration}</h2>
                            <h2 className="listing-subtext">price in USD: {price}</h2>
                            <h2 className="listing-subtext">description: {description}</h2>
                        </section>
                        <br/>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Unaccept</button>
                        </div>
                    </section>
                </section>
            </>
        )
    };


export default MyListingsAccepted;