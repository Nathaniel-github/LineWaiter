import './listing.css'
import React, {useEffect, useState} from "react"

const MyListingsAccepted = ({ _id, title, location, time, duration, price, description, username, ready }) => {
    // State variable to manage the audio object


    const [userEmail, setUserEmail] = useState('')

    fetch('/getUser', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
    })
    .then((res) => res.json())
    .then((data) => {
        setUserEmail(data.email) ;
    })

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

    const handleReady = (e) => {
        fetch('/readyListing/', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({"listing_id": _id})
    })
    .then((res) => res.json())
    .then((data) => {
        setUserEmail(data.email) ;
    })
        setTimeout(() => {
          window.location.reload();
        }, 3000);
    }


        if (ready === true) {
            return (
            <>
                <section className="listing-container">
                    <section className="listing-accepted-and-ready">
                        <h3 className="listing-title">Title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">Location 📍: {location}</h2>
                            <h2 className="listing-subtext">Time 🕒: {time}</h2>
                            <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                            <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                            <h2 className="listing-subtext">Description: {description}</h2>
                            <h2 className="listing-subtext">Lister email: {userEmail}</h2>
                        </section>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleReady}>Ready!</button>
                        </div>
                    </section>
                </section>
            </>
            )
        } else {
            return (
            <>
                <section className="listing-container">
                    <section className="listing-accepted-not-ready">
                        <h3 className="listing-title">Title: {title}</h3>
                        <section className="listing-details">

                                <h2 className="listing-subtext">Location 📍 : {location}</h2>
                                <h2 className="listing-subtext">Time 🕒: {time}</h2>
                                <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                                <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                                <h2 className="listing-subtext">Description: {description}</h2>

                            <h2 className="listing-subtext">Lister email: {userEmail}</h2>
                        </section>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Unaccept</button>
                        </div>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleReady}>Ready!</button>
                        </div>
                    </section>
                </section>
            </>
        )
    };

};


export default MyListingsAccepted;