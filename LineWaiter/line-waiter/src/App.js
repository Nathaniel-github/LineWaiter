import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/navbar'
import CreateListing from './pages/createlisting'

function App() {

    return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;