import React from 'react'
import './navbar.css'
import {Outlet, Link} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <ul>
                    <li>
                        <Link to="/home" style={{ textDecoration: 'none'}}>Home</Link>
                    </li>
                    <li>
                        <Link to="/my-listings" style={{ textDecoration: 'none'}}>My Listings</Link>
                    </li>
                    <li>
                        <Link to="create-listing" style={{ textDecoration: 'none'}}>Create a Listing</Link>
                    </li>
                </ul>
            </div>

            <Outlet />
        </>
    )
}

export default Navbar;