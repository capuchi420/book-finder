import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import styled from 'styled-components'
import WTR_Card from "../components/WTR_Card";

export const Profile = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  const [user, setUser] = useState([]);
  const [books, setBooks] = useState(undefined);
  const [show, setShow] = useState(false);
  

  useEffect(() => {
    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
            setUser(data.user.wantToRead);
        });
    }

    const getAllBooks = async () => {
      await getUser();
      let update = [];
      fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => {
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < user.length; j++){
            if(data[i]._id === user[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setBooks(update.reverse());
        setShow(true);
      });
    }

    getAllBooks();
  },[show]);

  return(
    <>
      <Navbar />
      <Header txt={user.username} />
      {show ? <WTR_Card books={books} /> : ""}
      <Footer />
    </>
  )
}

