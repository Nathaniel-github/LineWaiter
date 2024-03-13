import './listing.css'

const Listing = ({ title, location, time, duration, price, description, username, user, id }) => {

    const handleSubmit = (e) => {
        const data = {
            username: user,
            _id: id
        }

        console.log(data)

        fetch('/acceptListing/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                console.log("accepted listing");
            } else {
                console.log("couldn't accept listing")
            }

        })
        .catch(error => {
            console.log("couldn't accept listing due to error");
        });
    }

    return (
        <>
            <section className="listing-container">
                <section className="listing">
                    <h3 className="listing-title">title: {title}</h3>
                    <section className="listing-details">
                        <h2 className="listing-subtext">location: {location}</h2>
                        <h2 className="listing-subtext">time: {time}</h2>
                        <h2 className="listing-subtext">duration: {duration}</h2>
                        <h2 className="listing-subtext">price: {price}</h2>
                        <h2 className="listing-subtext">description: {description}</h2>
                    </section>
                    <br />
                    <div className="listing-submit">
                        <button className="accept-button" onClick={handleSubmit}>Accept Listing</button>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Listing;