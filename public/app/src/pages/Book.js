import React from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Form } from "../components/Form";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const Book = () => {
  return(
    <>
      <Navbar />
      <Header />
      <Form />
      <Cards/>
      <Footer />
    </>
  )
}
