import React, { useState, useEffect } from "react";
import styled from "styled-components";

const socket = io();

/**
 * Renders active conversations to sidepanel
 */
 

const Conversations = ({
  addMessage,
  setActiveChat,
  activeConversations,
  setActiveConversations,
  email,
  isGroupOrDm,
  currentRoom,
  groupChatName,
  deleteOnDisconnect
}) => {

  // mapping dispatch to props- ADD_MESSAGE action creator 
// const mapDispatchToProps = dispatch => ({
//   addMessage: (message) => {
//     dispatch(addMessage(message));
//   }
// });

  /**
   * Set state
   * directOpen determines whether to expand or hide active direct messages - passed as prop to styled component and changes display based on value
   * groupOpen  determines whether to expand or hide active group messages - passed as prop to styled component and changes display based on value
   */
  const [directOpen, setDirectOpen] = useState(true);
  const [groupOpen, setGroupOpen] = useState(false);
  const [conversationSelected, setConversationSelected] = useState(false);

  // Make request for all active conversations

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email }),
      };
      try {
        const request = await fetch("/chat/userconvos", requestOptions);
        const response = await request.json();

        // update list of users who have an active conversation with logged-in user

        setActiveConversations(
          response.conversations.map((convo) => {
            // conversation list query returns both users attached to a conversation
            // filter out user name of logged in user to display only recipient email
            const noDuplicatesArr = [];
            const temp = convo.participants.filter((user) => {
              if (user.name !== email && !noDuplicatesArr.includes(user.name)) {
                noDuplicatesArr.push(user.name);
                return user.name;
              }
            });
            return temp[0].name;
          })
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // handles click of direct caret

  const handleDirectClick = (e) => {
    if (directOpen) setDirectOpen(false);
    else setDirectOpen(true);
  };

  // handles click of group caret

  const handleGroupClick = (e) => {
    if (groupOpen) setGroupOpen(false);
    else setGroupOpen(true);
  };

  // request chat log info for selected user

  const handleUserClick = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: email,
        recipient: e.target.innerText,
      }),
    };

    /**
     * immediately invoked Async function
     * makes request to server for conversation object using username
     */

    try {
      (async () => {
        const request = await fetch("/chat/convo", requestOptions);
        const response = await request.json();
        // setActiveChat action updates state with currently selected user chat log
        setActiveChat({ response: response, recipient: e.target.innerText });
      })();
    } catch (err) {
      console.log(err);
    }
  };

  //-----------------------------------------
  // create a new room functionality
  // Join chatroom
  const randomChatRooms = ['Stab-Rabbit', 'Muscular-Corgi', 'Evil-Snowman', 'Droopy-Eyed-Snake'];
  let chatrooms = []

  const joinRoomBtn = (e, roomName) => {
    let currRoom = e.target.id
    console.log('ROOM NAME ----> ', currRoom)
    if (currRoom) {
      deleteOnDisconnect()
      socket.emit('userdisconnect', currRoom)
    }
    isGroupOrDm(true)
    socket.emit('joinRoom', (currRoom));
    socket.on('message', message => {
      groupChatName(message);
      currentRoom(currRoom);
      // Scroll down
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    socket.on('newIndividualMessages', newChatMessage => {
      addMessage(newChatMessage)
    })
  }

  const reloadPage = () => {
    location.reload();
  }

  // creating list items or a tags
  for (let i = 0; i < randomChatRooms.length; i += 1) {
    let temp = randomChatRooms[i]
    chatrooms.push(<li className="groupsName" id={temp} onClick={(e) => joinRoomBtn(e)}>{randomChatRooms[i]}</li>)
  }

  return (
    <Container>
      <Header>Conversations</Header>
      <Ul>
        <li>
          <DirectCaret onClick={(e) => handleDirectClick(e)} open={directOpen}>
            Direct
          </DirectCaret>
          <InnerList open={directOpen}>
            {activeConversations.map((user, i) => (
              <Direct
                key={`${user}${i}`}
                email={user}
                onClick={(e) => handleUserClick(e)}
              >
                {user}
              </Direct>
            ))}
          </InnerList>
        </li>
        <li>
          <GroupCaret onClick={(e) => handleGroupClick(e)} open={groupOpen}>
            Groups
          </GroupCaret>
        </li>
        <InnerList open={groupOpen}>
          {chatrooms}
        <button onClick={reloadPage}> Leave Chat </button>
        </InnerList>
      </Ul>
    </Container>
  );
};

export default Conversations;

/**
 * Styled Components
 */
const Container = styled.div`
  height: 65%;
  margin-top: -1rem;
  z-index: 2;
  font-family: "Josefin Sans", sans-serif;
  overflow: hidden;
`;
const Ul = styled.ul`
  height: fit-content;
  list-style-type: none;
  margin-left: 2rem;
`;

const DirectCaret = styled.span`
  z-index: 0;
  cursor: pointer;
  user-select: none;

  &:before {
    font-family: times-new-roman;
    content: "\\005E";
    color: black;
    display: inline-block;
    padding: 0.5rem;
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(90deg)")};
  }
`;

const GroupCaret = styled(DirectCaret)`
  &:before {
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(90deg)")};
  }
`;

const Direct = styled.li`
  text-indent: 1rem;
  padding: 0.5rem;
  margin-left: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #fcf7fa;
  }
`;

const InnerList = styled.ul`
  list-style-type: none;
  display: ${(props) => (props.open ? "initial" : "none")};
`;

const Group = styled(Direct)``;

const Header = styled.h3`
  height: fit-content;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
`;
