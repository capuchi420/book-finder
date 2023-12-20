import React from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const Home = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  return(
    <>
      <Navbar />
      <Header />
      <Cards/>
      <Footer />
    </>
  )
}
