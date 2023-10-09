import React from "react";
import styled from 'styled-components';

export const Navbar = () => {
    return(
        <Container>
            <h6>FindYoBook</h6>
        </Container>
    );
}

const Container = styled.div`
    background-color: #F8F0E5;
    padding: 1rem;

    h6{
        font-family: 'Caveat', cursive;
    }
`