import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export const ForumCard = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/forums/${props._id}`);
  }

  return (
    <Container>
      <h3 onClick={handleClick} >{props.forum_name}</h3>
      <p>{props.forum_desc}</p>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-shadow: 0 0 3px 1px rgba(0,0,0,.3);
  border-radius: .5rem;
  padding: 1rem;

  h3{
    cursor: pointer;
    width: fit-content;
    transition: all .3s ease;

    &:hover{
      color: #0f2c59;
    }
  }

  p{
    margin-top: .5rem;
    font-size: .8rem;
  }

  @media only screen and (min-width: 767px){
        max-width: 350px;
    }

    @media only screen and (min-width: 1366px){
        max-width: 500px;
    }

    @media only screen and (min-width: 1920px){
        max-width: 750px;
    }

`
