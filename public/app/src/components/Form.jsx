import React from "react";
import styled from "styled-components";

export const Form = () => {
    return(
        <Container>
            <form>
                <input type="text" placeholder="find yo damn book..." />
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
        </Container>
    );
}

const Container = styled.div`
    padding: 0 1rem 2.3rem;

    form{
        padding: .5rem 1rem .5rem 0;
        border-radius: .6rem;
        box-shadow: 0 0 4px 0 rgba(0,0,0,.3);
        display: flex;
        
        input{
            width: calc(100% - 36.813px);
            font-size: .8rem;
            padding: 1rem;
            background: none;
            border: none;

            &:focus{
                outline: none;
            }
        }

        button{
            background: none;
            border: none;
            i{
                font-size: 2.3rem;
            }
        }
    }
`