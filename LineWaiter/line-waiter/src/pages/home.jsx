import { useState, useEffect } from 'react'
import {type} from "@testing-library/user-event/dist/type";
import Listing from '../components/listing.jsx'
import ListingContainer from "../components/listingcontainer";

function Home() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/allListings").then(
            res=> res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, []);

    const listingsMap = data.map(
        ({ title, location, time, duration, price, description}) => (
            <Listing
                title={title}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
            />
        )
    );

    return (
       <ListingContainer listing={listingsMap} />
    );
}

export default Home;
