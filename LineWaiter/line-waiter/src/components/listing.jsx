import { useState } from 'react';

import './listing.css'
import TextField from "@mui/material/TextField";
import React from "react";

const Listing = ({ title, location, time, duration, price, description, username, user, id }) => {

    const [bidAmount, setBidAmount] = useState('');

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    }

    const submitBidAmount = (e) => {
        const data = {
            username: localStorage.getItem("user"),
            bid: bidAmount,
            listing_id: id
        }

        fetch('/placeBid/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res => res.json()).then(
            data => {
                if (data.status === "success") {
                } else {
                }
                window.location.reload();
            }
        )
    }

    const handleSubmit = (e) => {
        const data = {
            username: user,
            _id: id
        }

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
            } else {
            }
            window.location.reload();


        })
        .catch(error => {
        });
    }

    return (
        <>
            <section className="listing-container">
                <section className="listing">
                    <h3 className="listing-title">{title}</h3>
                    <section className="listing-details">
                        <h2 className="listing-subtext">Location 📍 : {location}</h2>
                        <h2 className="listing-subtext">Time 🕒: {time}</h2>
                        <h2 className="listing-subtext">Duration (mins) ⏰: {duration}</h2>
                        <h2 className="listing-subtext">Price (USD) 💲: {price}</h2>
                        <h2 className="listing-subtext">Description: {description}</h2>
                    </section>
                    <div className="listing-submit">
                        <button className="accept-button" onClick={handleSubmit}>Accept Listing</button>
                    </div>
                    <section className="bidding-section">
                        <form onSubmit={submitBidAmount}>
                            <TextField
                                label="Bid Amount (Number)"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="bid"
                                onChange={handleBidChange}
                            />
                            <div className="listing-submit">
                                <button className="accept-button">Send Bid Amount</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Listing;