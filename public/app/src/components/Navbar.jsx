import React from "react";
import styled from 'styled-components';

export const Navbar = () => {
    return(
        <Container>
            <h4>FindYoBook</h4>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F8F0E5;
    padding: 1rem;

    h4{
        font-family: 'Caveat', cursive;
    }
`