import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        if(window.location.href === 'http://localhost:3000/book'){
            window.location.reload(true);
        }else{
            navigate(`/book`);
        }
    }

    const handleProfileClick = () => {
        navigate(`/profile/${document.cookie.slice(4, document.cookie.length)}`)
    }

    return(
        <Container>
            <div>
                <h4 onClick={handleClick}>FindYoBook</h4>
                <h4 onClick={handleClick}>Forums</h4>
            </div>
            <i className="fa-solid fa-user" onClick={handleProfileClick}></i>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F8F0E5;
    padding: 1rem;
    display: flex;
    justify-content: space-between;

    h4{
        font-family: 'Caveat', cursive;
        cursor: pointer;
        display: inline-block;
        margin-right: 2rem;
    }

    i{
        cursor: pointer;
    }

    @media only screen and (min-width: 768px){
        padding: 1rem 2rem;
    }

    @media only screen and (min-width: 1366px){
        padding: 1rem 12.5rem;
    }
`