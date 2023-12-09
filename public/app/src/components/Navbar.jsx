import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const input = "";
        document.cookie = `input=${input}`;
        window.location.reload();
        navigate(`/`);
    }

    return(
        <Container>
            <h4 onClick={handleClick}>FindYoBook</h4>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F8F0E5;
    padding: 1rem;

    h4{
        font-family: 'Caveat', cursive;
        cursor: pointer;
    }

    @media only screen and (min-width: 768px){
        padding: 1rem 2rem;
    }

    @media only screen and (min-width: 1366px){
        padding: 1rem 12.5rem;
    }
`