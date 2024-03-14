import { useState, useEffect } from 'react'
import MyListingsListing from '../components/myListingsListing.jsx'
import ListingContainerV2 from "../components/listingcontainerV2"
import MyListingsAccepted from '../components/myListingsAccepted.jsx'
import './mylistings.css'
import { useNavigate } from 'react-router-dom';


function MyListings() {

    const navigate = useNavigate();
     useEffect(() => {
         const loggedInUser = localStorage.getItem("user");
         if (loggedInUser !== "none") {
         } else {
           navigate('/');
         }
    }, []);

    const loggedInUser = localStorage.getItem("user");

    const [origData, setOrigData] = useState([{}])
    const [userEmail, setUserEmail] = useState([{}])

    useEffect(() => {
        fetch("/allListings",{credentials: 'include'})
            .then(
            res=> res.json()

        ).then(
            data => {
                setOrigData(data)
            }
        )
    }, []);

    const filteredPosted = origData.filter(item =>
    item.username?.includes(loggedInUser)
  );

    const filteredAccepted = origData.filter(item =>
    item.user_accepted?.includes(loggedInUser)
  );

    const postedMap = filteredPosted.map(
        ({ _id, name, location, time, duration, price, description, user_accepted, ready}) => (
            <MyListingsListing
                 _id={_id}
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
                ready={ready}
                user_accepted={user_accepted}
            />
        )
    );

    const acceptedMap = filteredAccepted.map(
        ({ _id, name, location, time, duration, price, description, username, ready}) => (
            <MyListingsAccepted
                 _id={_id}
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
                username={username}
                ready={ready}
            />
        )
    );

    return (
        <div className="mylistings-body">
            <div className="home-intro">
                <p> Welcome to your listings! The left column displays the listings you have posted. The border
                    will remain red until someone accepts. Once someone accepts
                    your listing, the border will turn yellow, and you will be notified by email. Once they are ready, the border
                    will turn green. On the right are the listings you have accepted to go wait in line for. You can find
                    the poster's email now displayed in the listing. When you have reached the front of the line,
                    press ready to notify the poster that they can come meet you now! You may need to refresh to
                get the latest changes. Happy waiting!</p>
            </div>
            <div className="row">
                <div className="column-left">
                    <div className="content-container">
                        <h1>Posted Listings</h1>
                        <ListingContainerV2 listing={postedMap}/>
                    </div>
                </div>
                <div className="column-right">
                    <div className="content-container">
                        <h1>Accepted Listings</h1>
                        <ListingContainerV2 listing={acceptedMap}/>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default MyListings;
