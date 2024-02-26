import React from "react";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Forums } from "./pages/Forums";
import { Forum } from "./pages/Forum";
import { ProfileCardPage } from "./pages/ProfileCardPage";


export const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/forums" element={<Forums />} />
        <Route path='/forums/:id' element={<Forum />} />
        <Route path='/list/:listname' element={<ProfileCardPage />} />
      </Routes>
    </BrowserRouter>
  )
}
