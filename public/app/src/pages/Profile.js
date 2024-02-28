import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styled from 'styled-components'
import Profile_Card from "../components/Profile_Card";
import { ForumCard } from "../components/ForumCard";

export const Profile = () => {
  // CHECK FOR COOKIE
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  // DECLARE
  const [user, setUser] = useState({
    username: "",
    wantToRead: [],
    reading: [],
    read: [],
    favForums: []
  });

  const [wantToRead_Books, setWantToRead_Books] = useState([]);
  const [reading_Books, setReading_Books] = useState([]);
  const [read_Books, setRead_Books] = useState([]);

  const [displayForum, setDisplayForum] = useState([]);

  const [show, setShow] = useState(false);
  
  // LOAD CONTENT
  useEffect(() => {

    // GO THROUGH FORUMS AND SELECT FAVORITE ONES, PLACE THEM IN displayForum
    const getForums = async () => {
      fetch('http://localhost:7777/forum/getAllForums').then(response => response.json()).then(data => {
      let update = [];  
      data.forEach(forum => {
          user.favForums.forEach(favForumId => {
            if(favForumId === forum._id){
              update.push(forum);
            }
          })
        });
        setDisplayForum(update.reverse());
      })
    }
    getForums();

    // GET A USER INFO
    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
            setUser(data.user);
        });
    }

    // GET ALL BOOKS AND SORT THEM
    const getAllBooks = async () => {
      await getUser();
      fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => {
       let update = [];

        // WANT TO READ BOOKS
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < user.wantToRead.length; j++){
            if(data[i]._id === user.wantToRead[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setWantToRead_Books(update.reverse());

        // READING BOOKS
        update = [];
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < user.reading.length; j++){
            if(data[i]._id === user.reading[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setReading_Books(update.reverse());

        // READ BOOKS
        update = [];
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < user.read.length; j++){
            if(data[i]._id === user.read[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setRead_Books(update.reverse());
        
        setShow(true);
      });
    }

    getAllBooks();
  },[show]); // eslint-disable-line


  return(
    <>
      <Navbar />
      <Header txt={user.username} />
      <Container>
        <div className="books">
          {show ? <Profile_Card txt="Wants to read" books={wantToRead_Books} name="wanttoread" /> : "" /* eslint-disable-line */} 
          {show ? <Profile_Card txt="Reading" books={reading_Books} name="reading"/> : "" /* eslint-disable-line */}
          {show ? <Profile_Card txt="Read" books={read_Books} name="read" /> : "" /* eslint-disable-line */}
        </div>
        <div className="forums">
          <h4>Favorite Forums</h4>
          <div className="forum-display">
          {show ? displayForum.map(forum => {
            return <ForumCard key={forum._id} {...forum} />
          }) : ""}
          </div>
          
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

    div.forum-display{
      width: auto;

      & > *{
        display: block;
        margin: auto;
        margin-top: 1rem;
      }
    }
  }

  @media only screen and (min-width: 768px){
    grid-template-columns: 30% 70%;
  }
`
