import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import styled from "styled-components";

export const Cards = (props) => {
    const [user, setUser] = useState({});



    const [books, setBooks] = useState([]);

    const [search, setSearch] = useState({
        based: "",
        uppercase: "",
        lowercase: "",
        camel: "",
        firstletter: ""
    });

    useEffect(() => {
        const getAllBooks = async () => {
            fetch('http://localhost:7777/db/getAllBooks').then(response => response.json()).then(data => setBooks(data));
        }

        getAllBooks();

        const getUser = () => {
            const user_id = document.cookie.slice(4, document.cookie.length);
      
            fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
                setUser(data.user);
            });
      
        }
      
        getUser();
    }, []);

    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      }

      const handleChange = (e) => {
        let value = e.target.value;
        setSearch({
            based: value,
            uppercase: value.toUpperCase(),
            lowercase: value.toLowerCase(),
            camel: camelize(value),
            firstletter: value.charAt(0).toUpperCase()
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const allBooks = books.map(book => {
        return <Card key={book._id} {...book} />
    });

    let update = [];

    books.map(book => {
        user.wantToRead.forEach(wtr_book => {
            if(wtr_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });

    const wantToReadBooks = update;
    update = [];

    books.map(book => {
        user.reading.forEach(reading_book => {
            if(reading_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });

    const readingBooks = update;
    update = [];

    books.map(book => {
        user.read.forEach(read_book => {
            if(read_book === book._id){
                update.push(<Card key={book._id} {...book} />);
            }
        })
    });

    const readBooks = update;

    console.log(props.page)

    return(
        <main>
             {!props.page && <Form>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="find yo damn book..." onChange={handleChange} value={search.based} />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </Form>}
            {!props.page ?
            <Container id="books">
                {search.based === "" ? allBooks : books.map(book => {
                                                                if(book.book_name.includes(search.based) || book.book_name.includes(search.uppercase) || book.book_name.includes(search.lowercase) || book.book_name.includes(search.camel) || book.book_name.includes(search.firstletter)){
                                                                    return <Card key={book._id} {...book} />;
                                                                }
                })}
            </Container> : (props.page === 'wanttoread' ? 
            <Container id="books">
                {wantToReadBooks}
            </Container>
                 : (props.page === 'reading' ? 
                 <Container id="books">
                     {readingBooks} 
                 </Container>
                 : (props.page === 'read' ? 
                 <Container id="books">
                    {readBooks}
                 </Container>
                 : "")))
                
            }
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