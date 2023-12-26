import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";

export const Profile = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
            setUser(data.user);
        });
    }

    getUser();
  },[])

  return(
    <>
      <Navbar />
      <Header txt={user.username} />
      <Footer />
    </>
  )
}