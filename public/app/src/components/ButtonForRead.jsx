import {React, useState, useEffect} from "react";
import styled from "styled-components";

export const ButtonForRead = (props) => {
    const [isInRead, setIsInRead] = useState(false);
    const [user, setUser] = useState({wantToRead: [], reading: []});


    useEffect(() => {
        const getUser = () => {
          const user_id = document.cookie.slice(4, document.cookie.length);
    
          fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
              setUser(data.user);
              data.user.read.forEach(_id => {
                if(_id === props.book_id){
                  setIsInRead(true);
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
    
        fetch('http://localhost:7777/user/addRead', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            console.log(data.user);
            if(!alert('Book added on the list "Read"')){window.location.reload();};
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
    
        fetch('http://localhost:7777/user/removeRead', {
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
        <Container onClick={isInRead ? handleRemoveR : handleR}>
            {isInRead ? "Remove from read" : "Add to read"}
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
        color: #eadbc8;
        background-color: transparent;
        border: 2px solid #eadbc8;
        font-weight: 900;
`