import { useState, useEffect } from 'react'
import Listing from '../components/listing.jsx'
import ListingContainer from "../components/listingcontainer";
import '../index.css'
import Searchbar from "../components/searchbar";
import { useNavigate } from 'react-router-dom';


function Home() {

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
    const [origData, setOrigData] = useState([{}])

    useEffect(() => {
        fetch("/allListings",{credentials: 'include'})
            .then(
            res=> res.json()

        ).then(
            data => {
                const newData = data.filter(item =>
                    !(item.hasOwnProperty('user_accepted'))
                );
                console.log(newData);
                setOrigData(newData)
                setData(newData)
                console.log("newData")
                console.log(newData)
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
        ({ name, location, time, duration, price, description, _id}) => (
            <Listing
                title={name}
                location={location}
                time={time}
                duration={duration}
                price={price}
                description={description}
                user={loggedInUser}
                id={_id}
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
