import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

export const ButtonForForum = (props) => {
    const [isInFavForums, setIsInFavForums] = useState(false);
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = () => {
          const user_id = document.cookie.slice(4, document.cookie.length);
    
          fetch(`http://localhost:7777/user/getUser/${user_id}`).then(response => response.json()).then(data => {
              setUser(data.user);
              data.user.favForums.forEach(forum => {
                if(forum === props.forum_id){
                  setIsInFavForums(true);
                }
              });
          });
    
      }
    
      getUser();
      }, []);

      const handleAdd = async (e) => {
        e.preventDefault();
    
        let dataToSend = {
          forum_id: props.forum_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/addFavForum', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        }).then(response => response.json()).then(data => {
          if(data.status){
            if(!alert('Forum added on the list "Favorites"')){window.location.reload();};
          }else{
            alert(data.msg);
          }
        })
      }
    
      const handleRemove = async (e) => {
        e.preventDefault();
    
        let dataToSend = {
          forum_id: props.forum_id,
          user_id: user._id
        };
    
        fetch('http://localhost:7777/user/removeFavForum', {
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

  return (
    <Container onClick={isInFavForums ? handleRemove : handleAdd}>
        {isInFavForums ? <><i className="fa-solid fa-xmark"></i> Remove from Favorites</> : <><i className="fa-solid fa-plus"></i> Add to Favorites</>}
    </Container>
  );
}

const Container = styled.button`
        display: block;
        margin: auto;
        padding: .4rem .8rem;
        background-color: #0f2c59;
        color: #fff;
        border: none;
        border-radius: 4px;
        box-shadow: 0 0 2px 2px rgba(0,0,0,.2);
        cursor: pointer;
`