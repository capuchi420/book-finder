import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Card = (props) => {
    // DECLARE
    const navigate = useNavigate();

    // HANDLE CLICK FUNCTION
    const handleClick = () => {
        navigate(`/book/${props._id}`);
    }

    return(
        <Container>
            <div className="img-holder">
                <img src={props.book_img_url} alt="Book Image" /* eslint-disable-line */ />
            </div>
            <div className="desc">
                <h4>{props.book_name}</h4>
                <h6>{props.book_author}</h6>
            </div>
            <button onClick={handleClick}>Read More</button>
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