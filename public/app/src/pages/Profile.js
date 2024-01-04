import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import styled from 'styled-components'
import Profile_Card from "../components/Profile_Card";

export const Profile = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  const [username, setUsername] = useState("");
  const [WTRuser, setWTRuser] = useState([]);
  const [Ruser, setRuser] = useState([]);
  const [ReadUser, setReadUser] = useState([]);

  const [WTRbooks, setWTRbooks] = useState(undefined);
  const [Rbooks, setRbooks] = useState(undefined);
  const [ReadBooks, setReadBooks] = useState(undefined);

  const [show, setShow] = useState(false);
  

  useEffect(() => {
    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
          console.log(data)
            setUsername(data.user.username);
            setWTRuser(data.user.wantToRead);
            setRuser(data.user.reading);
            setReadUser(data.user.read);
        });
    }

    const getAllBooks = async () => {
      await getUser();
      let update = [];
      fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => {
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < WTRuser.length; j++){
            if(data[i]._id === WTRuser[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setWTRbooks(update.reverse());

        update = [];
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < Ruser.length; j++){
            if(data[i]._id === WTRuser[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setRbooks(update.reverse());

        update = [];
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < ReadUser.length; j++){
            if(data[i]._id === ReadUser[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setReadBooks(update.reverse());
        
        setShow(true);
      });
    }

    getAllBooks();
  },[show]);

  return(
    <>
      <Navbar />
      <Header txt={username} />
      {show ? <Profile_Card txt="Wants to read" books={WTRbooks} /> : ""}
      {show ? <Profile_Card txt="Reading" books={Rbooks} /> : ""}
      {show ? <Profile_Card txt="Read" books={ReadBooks} /> : ""}
      <Footer />
    </>
  )
}

