import React from "react";
import { Navbar } from "../components/Navbar";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const ProfileCardPage = () => {
  // CHECK FOR COOKIE
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  // DECLARE
  const page = document.location.pathname.split('/')[2];

  return(
    <>
      <Navbar />
      <Cards page={page} />
      <Footer />
    </>
  )
}
