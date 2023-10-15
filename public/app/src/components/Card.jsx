import React from "react";
import styled from "styled-components";

export const Card = () => {
    return(
        <Container>
            <div className="img-holder">
                <img src="assets/img.jpg" alt="Book Image" />
            </div>
            <div className="desc">
                <h4>Naziv Dela</h4>
                <h6>Autor</h6>
            </div>
            <button>Read More</button>
        </Container>
    );
}

const Container = styled.div`
    width: fit-content;
    background-color: #eadbc8;
    padding: .6rem;
    border-radius: .7rem;

    div.img-holder{
        img{
            height: 110px;
            width: 115px;
            border-radius: .7rem;
        }
    }

    button{
        width: 100%;
        margin-top: 1rem;
        border: none;
        border-radius: .7rem;
        background-color: #f8f0e5;
        padding: .5rem 1rem;
        font-size: 1rem;
    }

    @media only screen and (min-width: 375px) and (max-width: 767px){
        div.img-holder{
            img{
                height: 139px;
                width: 144px;
            }
        }
    }

    @media only screen and (min-width: 1366px){
        div.img-holder{
            img{
                height: 187px;
                width: 192px;
            }
        }
    }

    @media only screen and (min-width: 1920px){
        div.img-holder{
            img{
                height: 319px;
                width: 324px;
            }
        }
    }
`