import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import styled from "styled-components";

export const Cards = (props) => {
    // DECLARE
    const [user, setUser] = useState({});

    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState("");

    const allBooks = books.map(book => {
        return <Card key={book._id} {...book} />
    });

      // HANDLE CHANGE FUNCTION
      const handleChange = (e) => {
        let value = e.target.value;
        setSearch(value);
    }

    // HANDLE SUBMIT FUNCTION
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        // GET ALL BOOKS AND PLACE THEM IN books
        const getAllBooks = async () => {
            fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => setBooks(data));
        }
        getAllBooks();

        // GET A USER AND PLACE IT IN user
        const getUser = () => {
            const user_id = document.cookie.slice(4, document.cookie.length);
      
            fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
                setUser(data.user);
            });
      
        }
      
        getUser();
    }, []);

    // LOADING CARDS FOR DIFFERENT KINDS OF BOOKS
    // - want to read books
    let update = [];
    books.map(book => { // eslint-disable-line
        user.wantToRead.forEach(wtr_book => {
            if(wtr_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });
    const wantToReadBooks = update;

    // - reading books
    update = [];
    books.map(book => { // eslint-disable-line
        user.reading.forEach(reading_book => {
            if(reading_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });
    const readingBooks = update;

    // - read books
    update = [];
    books.map(book => { // eslint-disable-line
        user.read.forEach(read_book => {
            if(read_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });
    const readBooks = update;

    return(
        <main>
             {!props.page && <Form>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Pronadji svoju knjigu" onChange={handleChange} value={search.based} />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </Form>}
            <Container id="books">
                {!props.page ?
                    (search.based === "" ? allBooks : books.map(book => { // eslint-disable-line
                                                                if(book.book_name.includes(search)){
                                                                    return <Card key={book._id} {...book} />;
                                                                }})) : (props.page === 'wanttoread' ? wantToReadBooks : (props.page === 'reading' ? readingBooks : readBooks))}
            </Container>
        </main>
    );
}

const Form = styled.div`
    padding: 0 1rem 2.3rem;

form{
    padding: .5rem 1rem .5rem 0;
    border-radius: .6rem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.3);
    display: flex;
    
    input{
        width: calc(100% - 36.813px);
        font-size: .8rem;
        padding: 1rem;
        background: none;
        border: none;

        &:focus{
            outline: none;
        }
    }

    button{
        background: none;
        border: none;
        i{
            font-size: 2.3rem;
        }
    }
}

@media only screen and (min-width: 768px){
    margin-left: 13.5rem;
    margin-right: 13.5rem;
}

@media only screen and (min-width: 1366px){
    margin-left: 28.22rem;
    margin-right: 28.22rem;
}

@media only screen and (min-width: 1920px){
    margin-left: 37.75rem;
    margin-right: 37.75rem;
}
`

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