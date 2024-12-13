import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";

// I imported the layout layer to make sure header and footer are consistent throughout the whole file
import Layout from "./Components/Layout";

// here are the imported pages with different names
import Home from "./pages/Home";
import List from "./pages/List";
import Cat from "./pages/Cat";
import Fav from "./pages/Fav";

// this is to make sure the pages are accessible in any other pages, and ensure each pages have the same name as their names
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/Search" element={<List />}/>
          <Route path="/:name" element={<Cat />}/>
          <Route path="/Fav" element={<Fav />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
export default App
