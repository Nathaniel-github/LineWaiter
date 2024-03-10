import { useState, useEffect } from 'react'
import Listing from '../components/listing.jsx'
import ListingContainer from "../components/listingcontainer";
import '../index.css'
import Searchbar from "../components/searchbar";
import { useNavigate } from 'react-router-dom';


function Home() {

    //const [user, setUser] = useState(false)

    // useEffect(() => {
    //     localStorage.setItem("user", "none");
    //     const loggedInUser = localStorage.getItem("user");
    //     setUser(false);
    // }, []);
    //
    // const navigate = useNavigate();
    // if (user === false) {
    //     console.log("here2")
    //     navigate('/');
    // }

    const [data, setData] = useState([{}])
    const [origData, setOrigData] = useState([{}])

    useEffect(() => {
        fetch("/allListings").then(
            res=> res.json()
        ).then(
            data => {
                setOrigData(data)
                console.log(data)
            }
        )
    }, []);

  const handleSearch = (query) => {
  const filtered = origData.filter(item =>
    item.name?.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filtered)
  setData(filtered);
};

    const listingsMap = data.map(
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
