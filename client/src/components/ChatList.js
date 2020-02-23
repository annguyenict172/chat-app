import React from 'react';
import styled from 'styled-components';

import ChatPreview from './ChatPreview';

const Wrapper = styled.div`
  padding: 8px;
  margin-top: 5px;
`;

class ChatList extends React.Component {
  render() {
    const { chats, onSelectChat, selectedChat, user } = this.props;
    return (
      <Wrapper>
        {chats.map(chat => (
          <ChatPreview 
            key={chat._id} 
            chat={chat}
            onSelectChat={onSelectChat}
            active={selectedChat._id === chat._id}
            user={user}
          />
        ))}
      </Wrapper>
    )
  }
}

export default ChatList;