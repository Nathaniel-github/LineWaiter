import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup";
import Login from "./components/login";
import Create_Listing from "./components/create_listing/create_listing";
import HomePage from "./components/Main";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/all-listings" exact element={<HomePage />} />
			<Route path="/create-listing" exact element={<Create_Listing />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;