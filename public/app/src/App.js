import React from "react";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Cards } from "./components/Cards";
import { Footer } from "./components/Footer";

export const App = () => {
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
