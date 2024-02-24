import React, {useEffect, useState} from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import styled from 'styled-components';
import { Comment } from '../components/Comment';

export const Forum = () => {
    const [forum, setForum] = useState({});
    const [comment, setComment] = useState({forum_id: document.location.pathname.split('/')[2],user_id: document.cookie.split('=')[1], comment: ""});

    useEffect(() => {
        const getAForum = async () => {
          const forum_id = document.location.pathname.split('/')[2];
          
          fetch(`http://localhost:7777/forum/getAForum/${forum_id}`).then(response => response.json()).then(data => {
            setForum(data);
          });
        }
    
        getAForum();
      }, []);

      const handleSubmit = async (e) => {
        fetch('http://localhost:7777/forum/postAComment',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        }).then(response => response.json()).then(data => {
            console.log(data.forum)
        })
      }

      const handleChange = (e) => {
        let value = e.target.value;
        setComment(data => {
            return {...data, [e.target.name]: value}
        })
      }

  return (
    <>
        <Navbar />
        <Header>
            <div>
                <h2>{forum.forum_name}</h2>
                <p>{forum.forum_desc}</p>  
            </div>
            <button><i className="fa-solid fa-plus"></i> Add to Favorites</button>
        </Header>
        <Form>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="what do you think?" name="comment" value={comment.comment} onChange={handleChange} />
                <button><i className="fa-solid fa-comment"></i></button>
            </form>
        </Form>
        {forum.comments ? forum.comments.map(comment => {
            return <Comment {...comment} />
        }).reverse() : ""}
        <Footer />
    </>
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

const Header = styled.div`
    background-color: #e4effa;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    
    div{
        text-align: center;
        padding: 2rem;

        h2{
            font-family: 'Caveat', cursive;
        }

        p{
            margin-top: .5rem;
            font-size: .9rem;
        }
    }

    button{
        display: block;
        margin: auto;
        padding: .4rem .8rem;
        background-color: #0f2c59;
        color: #fff;
        border: none;
        border-radius: 4px;
        box-shadow: 0 0 2px 2px rgba(0,0,0,.2);
    }
`