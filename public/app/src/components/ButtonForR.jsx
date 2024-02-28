import {React, useState, useEffect} from "react";
import styled from "styled-components";

export const ButtonForR = (props) => {
    // DECLARE
    const [isInReading, setIsInReading] = useState(false);
    const [user, setUser] = useState({wantToRead: [], reading: []});


    useEffect(() => {
      // GET A USER AND PLACE IT IN user
        const getUser = () => {
          const user_id = document.cookie.slice(4, document.cookie.length);
    
          fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
              setUser(data.user);

              // CHECK IF THE BOOK IS IN LIST user.reading, IF IT IS, CHANGE isInReading TO TRUE
              data.user.reading.forEach(_id => {
                if(_id === props.book_id){
                  setIsInReading(true);
                  console.log('aa');
                }
              });
          });
    
      }
    
      getUser();
      }, []); // eslint-disable-line

      // HANDLE ADD BOOK TO READING LIST FUNCTION
      const handleAdd = async (e) => {
        let dataToSend = {
          book_id: props.book_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/addReading', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            if(!alert('Book added')){window.location.reload();}
          }else{
            alert(data.msg);
          }
        })
      }
    
      // HANDLE REMOVE FROM READING LIST FUNCTION
      const handleRemove = async (e) => {    
        let dataToSend = {
          book_id: props.book_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/removeReading', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            if(!alert('Book removed')){window.location.reload();}
          }else{
            alert(data.msg);
          }
        })
      }

    return(
        <Container onClick={isInReading ? handleRemove : handleAdd}>
            {isInReading ? "Stop reading" : "Start reading"}
        </Container>
    );
}

const Container = styled.button`
        display: block;
        width: 100%;
        margin: .5rem auto;
        padding: .5rem 1rem;
        border: none;
        border-radius: 11px;
        font-size: 1rem;
        cursor: pointer;
        max-width: 382px;
        color: #000;
        background-color: #eadbc8;
`