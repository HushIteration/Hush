import React from 'react';
import styled from 'styled-components';
import SendMessage from './SendMessage.jsx';
import Messages from './Messages.jsx';


/**
 * Renders chat box to dashboard
 * Consists of messages and input to send messages
 */

const Message_Display = ({ activeChat, sendMessage, activeConversations, email, activeRecipient, clientSocket, addNewMessage, message, isGroupOrDm, currentRoom, groupChatName }) => {
  return (
    <Container>
      <Messages
        email={email}
        activeChat={activeChat}
        groupMessage={message}
        groupChatName={groupChatName}
      />
      <SendMessage
        addNewMessage={addNewMessage}
        clientSocket={clientSocket}
        activeRecipient={activeRecipient}
        email={email}
        activeChat={activeChat}
        dispatch={sendMessage}
        isGroupOrDm={isGroupOrDm}
        currentRoom={currentRoom}
      />
    </Container>
  );
};

export default Message_Display;

/**
 * Styled Components
 */

const Container = styled.div`
  position: fixed;
  left: 15rem;
  bottom: 1rem;
  height: 80%;
  width: 70%;
  
`;