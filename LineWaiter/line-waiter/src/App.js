import React, {useState, useEffect} from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

function App() {

    return (
    <BrowserRouter>
      <Routes>
          <Route path={"home"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;