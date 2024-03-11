import { useState, useEffect } from 'react'
import Listing from '../components/listing.jsx'
import ListingContainer from "../components/listingcontainer";
import '../index.css'
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

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/allListings",{credentials: 'include'})
            .then(
            res=> res.json()

        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, []);

    const filtered = data.filter(item =>
    item.username?.toLowerCase().includes(loggedInUser)
  );

    const listingsMap = filtered.map(
        ({ name, location, time, duration, price, description}) => (
            <Listing
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
            />
        )
    );

    return (
        <>
            <div className="container">
                <ListingContainer listing={listingsMap} />
            </div>
        </>
    );
}

export default MyListings;
