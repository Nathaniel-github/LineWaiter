import useSound from 'use-sound';
import './listing.css'
import React, {useEffect, useState} from "react"

const MyListingsAccepted = ({ _id, title, location, time, duration, price, description, username }) => {
    // State variable to manage the audio object

    console.log("starting")

    // const [playSound] = useSound("/LineWaiter/LineWaiter/line-waiter/public/sad_cartoon_sound_effect.mp3");
    console.log("username: " + username);

    const [userEmail, setUserEmail] = useState('')
    // const [playSound] = useSound(process.env.PUBLIC_URL+ "/sad_cartoon_sound_effect.mp3");

    fetch('/getUser', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("data")
        console.log(data)
        setUserEmail(data.email) ;
    })
    console.log("email");
    console.log(userEmail)
    const handleDeleteClick = (e) => {
        try {
            //playSound();
            console.log("someAudioFile");
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

                                <h2 className="listing-subtext">location 📍 : {location}</h2>
                                <h2 className="listing-subtext">time 🕒: {time}</h2>
                                <h2 className="listing-subtext">duration (mins) ⏰: {duration}</h2>
                                <h2 className="listing-subtext">price (USD) 💲: {price}</h2>
                                <h2 className="listing-subtext">description: {description}</h2>

                            <h2 className="listing-subtext">lister email: {userEmail}</h2>
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