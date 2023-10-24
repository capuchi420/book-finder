import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Form } from "../components/Form";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const Book = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getABook = async () => {
      const id = document.location.pathname.split('/')[2];
      
      fetch(`http://localhost:7777/db/getABook/${id}`).then(response => response.json()).then(data => setBook(data));
    }

    getABook();
  }, []);

  console.log(book)

  return(
    <>
      <Navbar />
      {book != null && <h1>{book.book_name}</h1>}
      {book != null && <h3>{book.book_author}</h3>}
      <Footer />
    </>
  )
}
