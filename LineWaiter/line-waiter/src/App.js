import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CreateListing from './pages/CreateListing';
import LoginForm from './pages/Login';
import SignupForm from "./pages/Signup";
import MyListings from "./pages/MyListings";
import ListingDetails from "./pages/ListingDetails"; // Import the new component

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/" element={<Navbar />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/my-listings" element={<MyListings />} />
                    <Route path="/listing/:id" element={<ListingDetails />} /> {/* New route for listing details */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
