import React from "react";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
      </Routes>
    </BrowserRouter>
  )
}
