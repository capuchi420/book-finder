import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import styled from "styled-components";

export const Cards = () => {
    const [books, setBooks] = useState([]);

    const [cookie, setCookie] = useState(undefined);

    useEffect(() => {
        setCookie(document.cookie.slice(6, document.cookie.lenght));
    }, []);

    console.log(cookie)

    useEffect(() => {
        const getAllBooks = async () => {
            fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => setBooks(data));
        }

        getAllBooks();
    }, []);

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      }

    return(
        <Container>
            {books.map(book => {
                if(cookie !== "" || cookie !== undefined){
                    if(book.book_name.includes(cookie) || book.book_name.includes(cookie.toUpperCase()) || book.book_name.includes(cookie.toLowerCase()) || book.book_name.includes(camelize(cookie)) || book.book_name.includes(cookie.charAt(0).toUpperCase())){
                        return <Card key={book._id} {...book} />;
                    }
                }else{
                    return <Card key={book._id} {...book} />;
                }
            })}
        </Container>
    );
}

const Container = styled.main`
    display: grid;
    margin: .5rem 1rem 2.5rem;
    grid-template-columns: repeat(2, 50%);
    row-gap: 1rem;
    justify-items: center;

    @media only screen and (min-width: 768px){
        grid-template-columns: repeat(4, 25%);
        margin: .5rem 2rem 2.5rem;
        row-gap: 2rem;
    }

    @media only screen and (min-width: 1366px){
        margin: .5rem 12.5rem 2.5rem;
        row-gap: 2.5rem;
    }

    @media only screen and (min-width: 1920px){
        row-gap: 3rem;
    }
`;