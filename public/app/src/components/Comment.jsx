import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

export const Comment = (props) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getAUser = async () => {
            fetch(`http://localhost:7777/user/getUser/${props.user_id}`).then(response => response.json()).then(data => {
                setUser(data.user);
            });
        }

        getAUser();
    }, []);
  return (
    <Container>
        <div className="user-info">
            <h1><i className="fa-solid fa-user"></i></h1>
            <h4>{user.username}</h4>
            <hr />
        </div>
        
        <div className="comment">
            <p>{props.comment}</p>
        </div>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    text-align: center;
    margin-top: 1rem;
    box-shadow: 0 0 1px 1px rgba(0,0,0,.2);
    padding: 1rem;

    div.user-info{
        hr{
            width: 80%;
            margin: auto;
        }
    }

    div.comment{
        margin: auto;
        max-width: 80%;
        margin-top: 1rem;
    }

    @media only screen and (min-width: 768px){
        grid-template-columns: 20% 80%;

        div.user-info{
            hr{
                display: none;
            }

            border-right: 1px solid #000;
        }

        div.comment{
            max-width: 100%;
            width: 100%;
            
            p{
                text-align: start;
                margin: 0 1rem 0 1rem;
            }
        }
    }

    @media only screen and (min-width: 1366px){
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
    }
`