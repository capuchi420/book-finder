import React from "react";
import { Card } from "./Card";
import styled from "styled-components";

export const Cards = () => {
    return(
        <Container>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </Container>
    );
}

const Container = styled.main`
    display: grid;
    margin: .5rem 1rem 2.5rem;
    grid-template-columns: repeat(2, 50%);
    row-gap: 1rem;
    justify-items: center;

    @media only screen and (min-width: 768px){
        grid-template-columns: repeat(4, 25%);
        margin: .5rem 2rem 2.5rem;
        row-gap: 2rem;
    }

    @media only screen and (min-width: 1366px){
        margin: .5rem 12.5rem 2.5rem;
        row-gap: 2.5rem;
    }

    @media only screen and (min-width: 1920px){
        row-gap: 3rem;
    }
`;