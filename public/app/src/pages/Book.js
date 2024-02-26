import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import { ButtonForWTR } from "../components/ButtonForWTR";
import { ButtonForR } from "../components/ButtonForR";
import { ButtonForRead } from "../components/ButtonForRead";

export const Book = () => {
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }
  
  const [book, setBook] = useState({});

  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const getABook = async () => {
      const book_id = document.location.pathname.split('/')[2];
      
      fetch(`http://localhost:7777/db/getABook/${book_id}`).then(response => response.json()).then(data => {
        setBook(data);
      });
    }

    getABook();
  }, []);

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
            <ButtonForWTR book_id={document.location.pathname.split('/')[2]} />
            <ButtonForR book_id={document.location.pathname.split('/')[2]} />
            <ButtonForRead book_id={document.location.pathname.split('/')[2]} />
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