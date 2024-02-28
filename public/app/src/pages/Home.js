import React from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const Home = () => {
  // CHECK FOR COOKIE
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  return(
    <>
      <Navbar />
      <Header txt="Find Yo BooK Here! More than 10 books are on out website! Check it out!!" />
      <Cards/>
      <Footer />
    </>
  )
}
