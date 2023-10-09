import React from "react";
import styled from "styled-components";

export const Header = () => {
    return (
        <Container>
            <h1>Find Yo BooK Here! More than 10 books are on out website! Check it out!!</h1>
        </Container>
    );
}

const Container = styled.header`
    padding: 1.6rem 1rem;

    h1{
        font-family: 'Caveat', cursive;
        text-align: center;
        font-size: 1.8rem;
    }
`