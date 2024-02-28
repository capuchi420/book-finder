import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export default function Profile_Card(props) {
  // DECLARE
  const navigate = useNavigate();
  
  // HANDLE CLICK FUNCTION
  const handleClick = () => {
    navigate(`/list/${props.name}`);
  }

  return (
    <WantToRead>
        <h5 onClick={handleClick}>{props.txt}</h5>
        <div className="grid">
          <div className="one">
            <img src={props.books[0] === null ? "" : props.books[0]} /* eslint-disable-line */ />
          </div>
          <div className="two">
          <img src={props.books[1] === null ? "" : props.books[1]} /* eslint-disable-line */ />
          </div>
          <div className="three">
          <img src={props.books[2] === null ? "" : props.books[2]} /* eslint-disable-line */ />
          </div>
        </div>
    </WantToRead>
  )
}

const WantToRead = styled.div`
  width: 80%;
  margin: 2rem auto 2rem auto;
  box-shadow: 0 0 3px 4px rgba(0,0,0,.2);
  padding: 1rem;
  border-radius: 26px;

  h5{
    text-align: center;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  div.grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;

    div:not([class="one"]){
      img{
        height: 50px;
        width: 100%;
      }
    }

    div{
      img{
        width: inherit;
        height: inherit;
      }
    }

    div.one{
      width: 100%;
      height: 100px;
      grid-row-start: 1;
      grid-row-end: 3;
      img{
        border-radius: 13px 0 0 13px;
      }
    }

    div.two{
      img{
        border-radius: 0 13px 0 0;
      }
    }

    div.three{
      img{ 
        border-radius: 0 0 13px 0;
      }
    }
  }
`;