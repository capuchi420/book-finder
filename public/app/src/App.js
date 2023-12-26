import React from "react";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";


export const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
