import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { ForumCard } from './ForumCard';

export const ForumsComponent = () => {
    // DECLARE
    const [forums, setForums] = useState([]);

    const [search, setSearch] = useState({
        based: "",
        uppercase: "",
        lowercase: "",
        camel: "",
        firstletter: ""
    });

    const allForums = forums.map(book => {
        return <ForumCard key={book._id} {...book} />
    });

    // FUNCTION FOR CAMELIZE
    function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      }

      // HANDLE CHANGE FUNCTION
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

    // HANDLE SUBMIT FUNCTION
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        // GET ALL FORUMS AND PLACE THEM IN forums
        const getAllForums = async () => {
            fetch('http://localhost:7777/forum/getAllForums').then(response => response.json()).then(data => setForums(data));
        }

        getAllForums();
    }, []);

  return (
    <main>
        <Form>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="find yo damn forum..." onChange={handleChange} value={search.based} />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </Form>
        <Container>
                {search.based === "" ? allForums : forums.map(forum => { /* eslint-disable-line */
                                                                if(forum.forum_name.includes(search.based) || forum.forum_name.includes(search.uppercase) || forum.forum_name.includes(search.lowercase) || forum.forum_name.includes(search.camel) || forum.forum_name.includes(search.firstletter)){
                                                                    return <ForumCard key={forum._id} {...forum} />;
                                                                }
                })}
            </Container>
    </main>
  )
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
    grid-template-columns: 100%;
    gap: 1rem;
    justify-items: center;

    @media only screen and (min-width: 768px){
        grid-template-columns: repeat(2, 50%);
        margin: .5rem 2rem 2.5rem;
        gap: 2rem;
    }

    @media only screen and (min-width: 1366px){
        margin: .5rem 12.5rem 2.5rem;
        gap: 2.5rem;
    }

    @media only screen and (min-width: 1920px){
        gap: 3rem;
    }
`;