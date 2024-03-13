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
                console.log(data)
                if (data.status === "success") {
                    console.log("placed bid")
                } else {
                    console.log("there was error")
                }
            }
        )
    }

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
            window.location.reload();


        })
        .catch(error => {
            console.log("couldn't accept listing due to error");
        });
    }

    return (
        <>
            <section className="listing-container">
                <section className="listing">
                    <h3 className="listing-title">{title}</h3>
                    <section className="listing-details">
                        <h2 className="listing-subtext">location 📍 : {location}</h2>
                        <h2 className="listing-subtext">time 🕒: {time}</h2>
                        <h2 className="listing-subtext">duration (mins) ⏰: {duration}</h2>
                        <h2 className="listing-subtext">price (USD) 💲: {price}</h2>
                        <h2 className="listing-subtext">description: {description}</h2>
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
                                <button className="accept-button" onClick={submitBidAmount}>Send Bid Amount</button>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Listing;