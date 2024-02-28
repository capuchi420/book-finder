import React, {useEffect, useState} from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import styled from 'styled-components';
import { Comment } from '../components/Comment';
import { ButtonForForum } from '../components/ButtonForForum';

export const Forum = () => {
    // CHECK FOR COOKIE
  const cookie = document.cookie;

  if(!cookie){
     window.location.href = '/';
  }
  
    // DECLARE
    const [forum, setForum] = useState({});
    const [comment, setComment] = useState({forum_id: document.location.pathname.split('/')[2], user_id: document.cookie.split('=')[1], comment: ""});

    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        let value = e.target.value;
        setComment(data => {
            return {...data, [e.target.name]: value}
        });
      }

    useEffect(() => {
        // GET A FORUM AND PLACE IT IN forum
        const getAForum = async () => {
          const forum_id = document.location.pathname.split('/')[2];
          
          fetch(`http://localhost:7777/forum/getAForum/${forum_id}`).then(response => response.json()).then(data => {
            setForum(data);
          });
        }
    
        getAForum();
      }, []);

      // HANDLE SUBMIT FUNCTION
      const handleSubmit = async (e) => {
        fetch('http://localhost:7777/forum/postAComment',{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        }).then(response => response.json()).then(data => {
            console.log(data.forum)
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
            <ButtonForForum forum_id={document.location.pathname.split('/')[2]} />
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
`