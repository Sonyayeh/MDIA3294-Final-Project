import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Layout from "./Components/Layout";

import Home from "./pages/Home";
import List from "./pages/List";
import Cat from "./pages/Cat";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path="/Search" element={<List />}/>
          <Route path="/:name" element={<Cat />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
export default App
