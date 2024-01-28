import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import styled from "styled-components";

export const Book = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }
  
  const [book, setBook] = useState({});
  const [user, setUser] = useState({wantToRead: []});
  const [isInWantToRead, setIsInWantToRead] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const getABook = async () => {
      const book_id = document.location.pathname.split('/')[2];
      
      fetch(`http://localhost:7777/db/getABook/${book_id}`).then(response => response.json()).then(data => {
        setBook(data);
      });
    }

    getABook();

    const getUser = async () => {
      const user_id = document.cookie.slice(4, document.cookie.length);

      fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
          setUser(data.user);
          setRepeat(true);
      });

  }

  getUser();

  const aa = async () => {
    user.wantToRead.forEach(book_id => {
      if(book_id === book._id){
        setIsInWantToRead(true);
      }
    })
  }
  
  aa();
  }, [repeat]);
  
  
  const handleWTR = async (e) => {
    e.preventDefault();

    let dataToSend = {
      book_id: book._id,
      user_id: user._id
    };

    fetch('http://localhost:7777/user/addWantToRead', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    }).then(response => response.json()).then(data => {
      if(data.status){
        if(!alert('Book added on the list "Want to read"')){window.location.reload();};
      }else{
        alert(data.msg);
      }
    })
  }

  const handleRemoveFromWantToRead = async (e) => {
    e.preventDefault();

    let dataToSend = {
      book_id: book._id,
      user_id: user._id
    };

    fetch('http://localhost:7777/user/removeWantToRead', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    }).then(response => response.json()).then(data => {
      if(data.status){
        if(!alert(data.msg)){window.location.reload();}
      }else{
        alert(data.msg);
      }
    });
    
  }

  const handleR = async (e) => {
    e.preventDefault();

    let dataToSend = {
      book_id: book._id,
      user_id: user._id
    };

    fetch('http://localhost:7777/user/addReading', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    }).then(response => response.json()).then(data => {
      if(data.status){
        console.log(data.user);
        alert('Book added on the list "Reading"');
      }else{
        alert(data.msg);
      }
    })
  }

  return(
    <>
      <Navbar />
      {book != null && (
        <Container>
        <main>
          <div>
            <img src={book.book_img_url} />
          </div>
          <section>
            <h1>{book.book_name}</h1>
            <h3>{book.book_author}</h3>
            <button id="wtr" onClick={isInWantToRead ? handleRemoveFromWantToRead : handleWTR} >{isInWantToRead ? "Remove from Want to read" : "Want to read"}</button>
            <button id="r" onClick={handleR} >Reading</button>
            <button id="sr">Stopped reading</button>
          </section>
        </main>
        <h5>Opis</h5>
        <p>{book.book_desc}</p>
        </Container>
      )}
      <Footer />
    </>
  )
}

const Container = styled.main`
  margin: 1.5rem 1rem;
  text-align: center;

  main{
    margin-bottom: 2.5rem;

    div{
      img{
        width: 328px;
        height: 328px;
        border-radius: 11px;
      }
    }

    section{
      margin: .3rem 0;

      button{
        display: block;
        width: 100%;
        margin: .5rem auto;
        padding: .5rem 1rem;
        border: none;
        border-radius: 11px;
        font-size: 1rem;
        cursor: pointer;
        max-width: 382px;
      }

      button#wtr{
        color: #fff;
        background-color: #0f2c59;
      }

      button#r{
        background-color: #eadbc8;
      }

      button#sr{
        border: 2.5px solid #dac0a3;
        color: #dac0a3;
        background-color: transparent;
      }
    }
  }

  p{
    max-width: 630px;
    margin: auto;
  }

  @media only screen and (min-width: 375px){
    main{
      div{
        img{
          width: 343px;
          height: 343px;
        }
      }
    }
  }

  @media only screen and (min-width: 411px){
    main{
      div{
        img{
          width: 378px;
          height: 378px;
        }
      }
    }
  }

  @media only screen and (min-width: 768px){
    margin: 1.5rem 2rem;

    main{
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 100%;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      div{
        img{
          width: 336px;
          height: 336px;
        }
      }
    }
  }

  @media only screen and (min-width: 1366px){
    margin: 1.5rem 12.5rem;

    main{
      div{
        img{
          width: 376px;
          height: 376px;
        }
      }
    }
  }
`;