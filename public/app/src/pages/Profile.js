import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import styled from 'styled-components'
import Profile_Card from "../components/Profile_Card";
import { ForumCard } from "../components/ForumCard";

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
  const [favForums, setFavForums] = useState([]);
  const [displayForum, setDisplayForum] = useState([]);

  const [show, setShow] = useState(false);
  

  useEffect(() => {
    const getForums = async () => {
      fetch('http://localhost:7777/forum/getAllForums').then(response => response.json()).then(data => {
      let update = [];  
      console.log(data)
      data.forEach(forum => {
        console.log(forum)
          favForums.forEach(favForumId => {
            console.log(favForumId);
            if(favForumId === forum._id){
              update.push(forum);
            }
          })
        });
        setDisplayForum(update.reverse());
      })
    }

    getForums();

    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
            setUsername(data.user.username);
            setWTRuser(data.user.wantToRead);
            setRuser(data.user.reading);
            setReadUser(data.user.read);
            setFavForums(data.user.favForums);
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
            if(data[i]._id === Ruser[j]){
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

  console.log(displayForum)

  return(
    <>
      <Navbar />
      <Header txt={username} />
      <Container>
        <div className="books">
          {show ? <Profile_Card txt="Wants to read" books={WTRbooks} /> : ""}
          {show ? <Profile_Card txt="Reading" books={Rbooks} /> : ""}
          {show ? <Profile_Card txt="Read" books={ReadBooks} /> : ""}
        </div>
        <div className="forums">
          <h4>Favorite Forums</h4>
          {show ? displayForum.map(forum => {
            return <ForumCard key={forum._id} {...forum} />
          }) : ""}
        </div>
      </Container>
      <Footer />
    </>
  )
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 100%;

  div.forums{
    h4{
      text-align: center;
      margin-bottom: .5rem;
    }
  }

  @media only screen and (min-width: 768px){
    grid-template-columns: 30% 70%;
  }
`
