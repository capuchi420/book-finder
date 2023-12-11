import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Login = () => {

  return(
    <Container>
        <div className="layer"></div>
      <div>
        <h1>Welcome back to the<br />Ljubitelji knjige!</h1>
      </div>
      <form>
        <div className="username">
            <input type="text" placeholder="Username" />
        </div>
        <div className="password">
            <input type="password" placeholder="********" />
        </div>
        <button>LOGIN</button>
        <p>Don't have an account? <Link to="/register">Register now!</Link></p>
      </form>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;

    div.layer{
        z-index: -1;
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom, #000, rgba(0,0,0,.1));
    }

    div{
        z-index: 1;
        padding-top: 2rem;

        h1{
            text-align: center;
            color: #fff;
            font-family: 'Caveat', cursive;
            font-size: 2rem;
        }
    }

    form{
        z-index: 1;
        width: fit-content;
        margin: auto;
        padding-top: 4rem;

        input{
            width: 70vw;
            max-width: 800px;
            padding: 1rem 1rem;
            border: none;
            border-radius: .75rem;
            outline: none;

            transition: .3s all ease;

                &:focus{
                    border-radius: 0;
                }
        }

        div > *{
            display: block;
        }

        button{
            display: block;
            margin: auto;
            margin-top: 1.5rem;
            margin-bottom: .5rem;
            padding: .8rem 1.6rem;
            width: 196px;
            border: none;
            border-radius: .7rem;
            background-color: #0F2C59;
            color: #fff;
            box-shadow: 0 0 3px 1px rgba(0,0,0,.7);
            transition: .5s all ease;

            &:hover{
                font-weight: 900;
                box-shadow: 0 0 5px 2px rgba(255,255,255,.4);
                border-radius: 2rem;
                width: 170px;
            }
        }

        p{
            text-align: center;
            color: #fff;
            font-size: .8rem;

            a{
                color: #2591d8;
            }
        }
    }
`;