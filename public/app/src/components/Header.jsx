import React from "react";
import styled from "styled-components";

export const Header = (props) => {
    return (
        <Container>
            <h1>{props.txt}</h1>
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

    @media only screen and (min-width: 768px){
        padding: 1.6rem 7.75rem;
    }

    @media only screen and (min-width: 1366px){
        padding: 1.6rem 22.98rem;
    }

    @media only screen and (min-width: 1920px ){
        padding: 1.6rem 29.33rem;

        h1{
            font-size: 3.12rem;
        }
    }
`