import { useState, useEffect } from 'react'
import MyListingsListing from '../components/myListingsListing.jsx'
import ListingContainer from "../components/listingcontainer"
import MyListingsAccepted from '../components/myListingsAccepted.jsx'
import './mylistings.css'
import { useNavigate } from 'react-router-dom';


function MyListings() {

    const navigate = useNavigate();
     useEffect(() => {
         const loggedInUser = localStorage.getItem("user");
         if (loggedInUser !== "none") {
            console.log("logged in");
         } else {
           navigate('/');
         }
    }, []);

    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser);

    const [origData, setOrigData] = useState([{}])

    useEffect(() => {
        fetch("/allListings",{credentials: 'include'})
            .then(
            res=> res.json()

        ).then(
            data => {
                setOrigData(data)
                console.log(data)
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
        ({ _id, name, location, time, duration, price, description}) => (
            <MyListingsListing
                 _id={_id}
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
            />
        )
    );

    const acceptedMap = filteredAccepted.map(
        ({ _id, name, location, time, duration, price, description}) => (
            <MyListingsAccepted
                 _id={_id}
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
            />
        )
    );

    console.log(filteredPosted);
    console.log(filteredAccepted);

    return (
        <div className="mylistings-body">
            <div className="row">
                <div className="column-left">
                    <div className="content-container">
                        <h1>Posted Listings</h1>
                        <ListingContainer listing={acceptedMap} />
                    </div>
                </div>
                <div className="column-right">
                    <div className="content-container">
                    <h1>Accepted Listings</h1>
                        <ListingContainer listing={acceptedMap} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyListings;
