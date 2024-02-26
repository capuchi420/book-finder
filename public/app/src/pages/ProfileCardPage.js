import React from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const ProfileCardPage = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  const page = document.location.pathname.split('/')[2];

  return(
    <>
      <Navbar />
      <Cards page={page} />
      <Footer />
    </>
  )
}
