import {React, useState, useEffect} from "react";
import styled from "styled-components";

export const ButtonForR = (props) => {
    const [isInReading, setIsInReading] = useState(false);
    const [user, setUser] = useState({wantToRead: [], reading: []});


    useEffect(() => {
        const getUser = () => {
          const user_id = document.cookie.slice(4, document.cookie.length);
    
          fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
              setUser(data.user);
              data.user.reading.forEach(_id => {
                if(_id === props.book_id){
                  setIsInReading(true);
                  console.log('aa');
                }
              });
          });
    
      }
    
      getUser();
      }, []);

      const handleR = async (e) => {
        e.preventDefault();
    
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
            console.log(data.user);
            if(!alert('Book added on the list "Reading"')){window.location.reload();};
          }else{
            alert(data.msg);
          }
        })
      }
    
      const handleRemoveR = async (e) => {
        e.preventDefault();
    
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
            console.log(data.user);
            if(!alert('Removed')){window.location.reload();}
          }else{
            alert(data.msg);
          }
        })
      }

    return(
        <Container onClick={isInReading ? handleRemoveR : handleR}>
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