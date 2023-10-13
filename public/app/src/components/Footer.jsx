import React from "react";
import styled from "styled-components";

export const Footer = () => {
    return(
        <Container>
            <p>Copyright &copy; 2023. All rights reserved</p>
        </Container>
    );
}

const Container = styled.footer`
    width: 100%;
    text-align: center;
    padding: .6rem;
    background-color: #0f2c59;
    color: #fff;
    font-size: .7rem;
`;