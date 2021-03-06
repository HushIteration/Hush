import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MessagesDisplay from '../components/MessagesDisplay.jsx';
import { sendMessage, deleteMessage, addNewMessage } from '../actions/actions';

/**
 * Maps dispatch to props & connects with MessagesDisplay component 
 */

const mapDispatchToProps = dispatch => ({
  addNewMessage: (messageObj) => {
    dispatch(addNewMessage(messageObj));
  }
});

export const Message_Container = connect(state => ({
  activeChat: state.user.activeChat,
  email: state.user.email,
  activeRecipient: state.user.activeRecipient,
  clientSocket: state.user.clientSocket,
  message: state.user.messageArray,
  isGroupOrDm: state.user.isGroupOrDm,
  currentRoom: state.user.currentRoom,
  groupChatName: state.user.groupChatName
}), mapDispatchToProps)(MessagesDisplay);