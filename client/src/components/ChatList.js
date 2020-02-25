import React from 'react';
import styled from 'styled-components';

import ChatPreview from './ChatPreview';
import NewChat from './NewChat';

const Wrapper = styled.div`
  padding: 8px;
  margin-top: 5px;
`;

class ChatList extends React.Component {
  render() {
    const { 
      chats, 
      onSelectChat, 
      selectedChat, 
      user,
      onNewChatCancel 
    } = this.props;

    return (
      <Wrapper>
        {chats.map(chat => {
          if (chat._id === 'new') {
            return (
              <NewChat 
                key={chat._id}
                onNewChatCancel={onNewChatCancel} 
              />
            )
          } else {
            return (
              <ChatPreview 
                key={chat._id} 
                chat={chat}
                onSelectChat={onSelectChat}
                active={selectedChat && selectedChat._id === chat._id}
                user={user}
              />
            )
          }
        })}
      </Wrapper>
    )
  }
}

export default ChatList;