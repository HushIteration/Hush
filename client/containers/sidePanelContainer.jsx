import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel.jsx';
import { initiateConversation, setActiveChat, addMessage, isGroupOrDm, currentRoom, groupChatName } from '../actions/actions.js';

const mapDispatchToProps = dispatch => ({
  initiateConversation: (email) => {
    dispatch(initiateConversation(email));
  } ,
  setActiveChat: (messages) => {
    dispatch(setActiveChat(messages));
  },
  addMessage: (message) => {
    dispatch(addMessage(message));
  },
  isGroupOrDm: (bool) => {
    dispatch(isGroupOrDm(bool));
  },
  currentRoom: (room) => {
    dispatch(currentRoom(room));
  },
  groupChatName: (name) => {
    dispatch(groupChatName(name));
  }
});

export const SidePanelContainer = connect((state) => ({
  activeConversations: state.user.activeConversations, 
  activeChat: state.user.activeChat}), mapDispatchToProps)(Sidepanel);