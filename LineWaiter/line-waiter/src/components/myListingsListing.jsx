import './listing.css'
import React, {useEffect, useState} from 'react';

const MyListingsListing = ({ _id, title, location, time, duration, price, description, username , ready}) => {

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
                console.log(data);
                if (data.status === "success") {
                    setLowestBidAmount(data.lowest_bid.bid);
                    console.log("success")
                } else {
                    setLowestBidAmount("N/A")
                    console.log("failure")
                }
            }
         )
    }, []);

    console.log("lowest bid amount: " + lowestBidAmount)

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
    }

    if (ready === true) {
        return (
            <>
                <section className="listing-container">
                    <section className="listing-accepted-and-ready">
                        <h3 className="listing-title">title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">location 📍 : {location}</h2>
                            <h2 className="listing-subtext">time 🕒: {time}</h2>
                            <h2 className="listing-subtext">duration (mins) ⏰: {duration}</h2>
                            <h2 className="listing-subtext">price (USD) 💲: {price}</h2>
                            <h2 className="listing-subtext">description: {description}</h2>
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
                    <section className="listing-accepted-not-ready">
                        <h3 className="listing-title">title: {title}</h3>
                        <section className="listing-details">
                            <h2 className="listing-subtext">location: {location}</h2>
                            <h2 className="listing-subtext">time: {time}</h2>
                            <h2 className="listing-subtext">duration in minutes: {duration}</h2>
                            <h2 className="listing-subtext">price in USD: {price}</h2>
                            <h2 className="listing-subtext">description: {description}</h2>
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