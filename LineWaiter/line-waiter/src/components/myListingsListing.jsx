import './listing.css'
import React, {useEffect, useState} from 'react';

const MyListingsListing = ({ _id, title, location, time, duration, price, description, username , user_accepted, ready}) => {

    const [lowestBidAmount, setLowestBidAmount] = useState('');

    useEffect(() => {
        const data = {
            listing_id: _id
        }
         fetch('/getLowestBid/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data),
        }).then(res => res.json()).then(
            data => {
                if (data.status === "success") {
                    setLowestBidAmount(data.lowest_bid.bid);
                } else {
                    setLowestBidAmount("N/A")
                }
            }
         )
    }, []);

    const handleDeleteClick = (e) => {
        try {
            const response = fetch('/deleteAListing/', {
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

    const acceptLowestBid = (e) => {
        const data = {
            listing_id: _id
        }

        fetch('/acceptLowestBid/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })

        window.location.reload();
    }

    if (ready === true) {
        return (
            <>
                <section className="listing-container">
                    <section className="listing-accepted-and-ready">
                        <h3 className="listing-title">Title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">Location 📍 : {location}</h2>
                            <h2 className="listing-subtext">Time 🕒: {time}</h2>
                            <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                            <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                            <h2 className="listing-subtext">Description: {description}</h2>
                        </section>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Delete Listing</button>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <h1 className="listing-subtext">Lowest Bid Amount: {lowestBidAmount}</h1>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={acceptLowestBid}>Accept Lowest Bid</button>
                        </div>
                    </section>
                </section>
            </>
        )
    } else if (user_accepted !== "" && user_accepted !== undefined) {
        return (
            <>
                <section className="listing-container">
                    <section className="listing-accepted-not-ready">
                        <h3 className="listing-title">Title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">Location 📍: {location}</h2>
                            <h2 className="listing-subtext">Time 🕒: {time}</h2>
                            <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                            <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                            <h2 className="listing-subtext">Description: {description}</h2>
                        </section>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Delete Listing</button>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <h1 className="listing-subtext">Lowest Bid Amount: {lowestBidAmount}</h1>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={acceptLowestBid}>Accept Lowest Bid</button>
                        </div>
                    </section>
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className="listing-container">
                    <section className="listing-not-accepted-not-ready">
                        <h3 className="listing-title">Title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">Location 📍: {location}</h2>
                            <h2 className="listing-subtext">Time 🕒: {time}</h2>
                            <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                            <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                            <h2 className="listing-subtext">Description: {description}</h2>
                        </section>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={handleDeleteClick}>Delete Listing</button>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <h1 className="listing-subtext">Lowest Bid Amount: {lowestBidAmount}</h1>
                        </div>
                        <br/>
                        <div className="listing-submit">
                            <button className="accept-button" onClick={acceptLowestBid}>Accept Lowest Bid</button>
                        </div>
                    </section>
                </section>
            </>
        )
    }
};


export default MyListingsListing;