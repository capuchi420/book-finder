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
        </Container>
    );
}

const Container = styled.main`
    display: grid;
    margin: .5rem 1rem 2.5rem;
    grid-template-columns: repeat(2, 50%);
    row-gap: 1rem;
    justify-items: center;
`;