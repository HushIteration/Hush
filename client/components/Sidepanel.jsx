import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Conversations from './Conversations.jsx';
import SearchBar from './SearchBar.jsx';
import UserDetails from './UserDetails.jsx';

/**
 * Renders Sidepanel, including current user details, user search bar, & active conversations
 */
const Sidepanel = ({ activesLoaded, setActivesLoaded, email, setActiveChat, setActiveConversations, activeConversations, activeChat, addMessage, isGroupOrDm, currentRoom, groupChatName }) => {

  /**
   * Set state
   *  open holds state that determines wether or not results component should be displayed
   *  passed as prop into serachBar then into Results styled-component
   */
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   console.log("ADD MESSAGE----->", addMessage)
  // })

  
  // set  open to true on click of input field - set open to false on click of container
  // passed as prop to searchBar and to handle initial click into search bar
  const handleClick = event => {
    if (open) setOpen(false);
    else if (event.target.id === 'input') setOpen(true);
  };

  return (
    <Container onClick={handleClick}>
      <UserDetails email={email} />
      <SearchBar 
        open={open} 
        handleClick={handleClick} 
        setActiveChat={setActiveChat} 
        setActiveConversations={setActiveConversations} 
        activeConversations={activeConversations} 
        email={email} 
      />
      <Conversations 
        isGroupOrDm={isGroupOrDm}
        addMessage={addMessage}
        email={email} 
        activesLoaded={activesLoaded} 
        setActivesLoaded={setActivesLoaded} 
        setActiveChat={setActiveChat} 
        setActiveConversations={setActiveConversations} 
        activeConversations={activeConversations} 
        currentRoom={currentRoom}
        groupChatName={groupChatName}
      />
    </Container>
  );
};

export default Sidepanel;

/**
 * Styled Components
 */

const Container = styled.div`
  border-right: 1px solid black;
  height: 100%;
  min-width: 15rem;
  max-width: 15rem;
  box-shadow: 1px 1px 1px darkgrey;
  background-color: #fcfcfc;
`;