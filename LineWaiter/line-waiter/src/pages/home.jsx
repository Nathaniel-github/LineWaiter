import { useState, useEffect } from 'react'
import {type} from "@testing-library/user-event/dist/type";
import Listing from '../components/listing.jsx'
import ListingContainer from "../components/listingcontainer";
import '../index.css'
import Searchbar from "../components/searchbar";

function Home() {

    const [data, setData] = useState([{}])
    let origData;

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

  const handleSearch = (query) => {
  const filtered = data.filter(item =>
    item.title?.toLowerCase().includes(query.toLowerCase())
  );
  setData(filtered);
};

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
        <>
            <div className="search-bar-container">
                  <Searchbar data={data} onSearch={handleSearch} />
            </div>
            <div className="container">
                <ListingContainer listing={listingsMap} />
            </div>
        </>
    );
}

export default Home;
