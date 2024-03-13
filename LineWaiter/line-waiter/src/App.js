import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/navbar'
import CreateListing from './pages/createlisting'
import LoginForm from './pages/login'
import SignupForm from "./pages/signup";
import MyListings from "./pages/mylistings";

function App() {


    return (
    <BrowserRouter>
      <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Navbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/my-listings" element={<MyListings />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;