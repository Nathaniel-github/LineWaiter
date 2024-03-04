import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import Login from "./components/login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/all-listings" exact element={<All-Listings />} />
			<Route path="/my-listings" exact element={<My-Listings />} />
			<Route path="/create-listing" exact element={<Create-Listing />} />
			<Route path="/profile-info" exact element={<Profile-Info />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;