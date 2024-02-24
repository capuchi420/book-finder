import React, {useEffect, useState} from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import styled from 'styled-components';

export const Forum = () => {
    const [forum, setForum] = useState({});

    useEffect(() => {
        const getAForum = async () => {
          const forum_id = document.location.pathname.split('/')[2];
          
          fetch(`http://localhost:7777/forum/getAForum/${forum_id}`).then(response => response.json()).then(data => {
            setForum(data);
          });
        }
    
        getAForum();
      }, []);

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
        <Footer />
    </>
  )
}

const Header = styled.div`
    background-color: #e4effa;
    padding-bottom: 2rem;
    
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