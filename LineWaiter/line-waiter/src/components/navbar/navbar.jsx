import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./navbar.css";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Filter Searches"
        />
      </div>
        <div className="profile-container">
            <a href="all-listings">
                All Listings
            </a>
            <a href="my-listings">
                My Listings
            </a>
            <a href="create-listing">
                Create a Listing
            </a>
            <a href="profile-info">
                Profile Information
            </a>
        </div>
    </nav>
  );
};

export default Nav;