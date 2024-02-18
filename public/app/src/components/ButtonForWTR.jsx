import {React, useState, useEffect} from "react";
import styled from "styled-components";

export const ButtonForWTR = (props) => {
    const [isInWantToRead, setIsInWantToRead] = useState(false);
    const [user, setUser] = useState({wantToRead: [], reading: []});


    useEffect(() => {
        const getUser = () => {
          const user_id = document.cookie.slice(4, document.cookie.length);
    
          fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
              setUser(data.user);
              console.log(props.book_id)
              data.user.wantToRead.forEach(_id => {
                if(_id === props.book_id){
                  setIsInWantToRead(true);
                  console.log('aa');
                }
              });
          });
    
      }
    
      getUser();
      }, []);

    const handleWTR = async (e) => {
        e.preventDefault();
    
        let dataToSend = {
          book_id: props.book_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/addWantToRead', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            if(!alert('Book added on the list "Want to read"')){window.location.reload();};
          }else{
            alert(data.msg);
          }
        })
      }
    
      const handleRemoveFromWantToRead = async (e) => {
        e.preventDefault();
    
        let dataToSend = {
          book_id: props.book_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/removeWantToRead', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            if(!alert(data.msg)){window.location.reload();}
          }else{
            alert(data.msg);
          }
        });
        
      }

    return(
        <Container onClick={isInWantToRead ? handleRemoveFromWantToRead : handleWTR}>
            {isInWantToRead ? "Remove from Want to read" : "Want to read"}
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
        color: #fff;
        background-color: #0f2c59;
`