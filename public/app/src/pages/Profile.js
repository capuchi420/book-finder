import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import styled from 'styled-components'

export const Profile = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }

  const [user, setUser] = useState({});
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getUser = async () => {
        const id = document.location.pathname.split('/')[2];

        fetch(`http://localhost:7777/user/getUser/${id}`).then(response => response.json()).then(data => {
            console.log(data.user)
            setUser(data.user);
        });
    }

    getUser();

    const getAllBooks = async () => {
      let update = [];
      fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => {
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < user.wantToRead.length; j++){
            if(data[i]._id === user.wantToRead[j]){
              update.push(data[i].book_img_url);
            }
          }
        }
        setBooks(update.reverse());
      });
    }

    getAllBooks();
  },[]);

  console.log(books)

  return(
    <>
      <Navbar />
      <Header txt={user.username} />
      <WantToRead>
        <h5>Wants to read</h5>
        <div className="grid">
          <div className="one">
            <img src={books[0] || ""} />
          </div>
          <div className="two">
          <img src={books[1] || ""} />
          </div>
          <div className="three">
          <img src={books[2] || ""} />
          </div>
        </div>
      </WantToRead>
      <Footer />
    </>
  )
}

const WantToRead = styled.div`
  width: 80%;
  margin: 2rem auto 2rem auto;
  box-shadow: 0 0 3px 4px rgba(0,0,0,.2);
  padding: 1rem;
  border-radius: 26px;

  h5{
    text-align: center;
    margin-bottom: 1rem;
  }

  div.grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;

    div:not([class="one"]){
      img{
        height: 50px;
        width: 100%;
      }
    }

    div{
      img{
        width: inherit;
        height: inherit;
      }
    }

    div.one{
      width: 100%;
      height: 100px;
      grid-row-start: 1;
      grid-row-end: 3;
      img{
        border-radius: 13px 0 0 13px;
      }
    }

    div.two{
      img{
        border-radius: 0 13px 0 0;
      }
    }

    div.three{
      img{ 
        border-radius: 0 0 13px 0;
      }
    }
  }
`;