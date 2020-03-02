import React from 'react';
import styled from 'styled-components';

import MessageSectionHeader from './MessageSectionHeader';
import Messages from './Messages';
import ChatBox from './ChatBox';

const Wrapper = styled.div`
  width: 75%;
  border-left: 1px solid #eaeaea;
  @media (max-width: 1000px) {
    width: calc(100% - 250px);
  }
`;

class MessageSection extends React.Component {
  seenChat = () => {
    this.props.seenChat(this.props.selectedChat);
  }

  render() {
    const { 
      messages, 
      user, 
      selectedChat, 
      newChat,
      onSelectUser,
      loadMoreMessages
    } = this.props;
    return (
      <Wrapper>
        <MessageSectionHeader 
          user={user}
          selectedChat={selectedChat}
          newChat={newChat}
          onSelectUser={onSelectUser}
        />
        <Messages 
          user={user}
          messages={messages}
          loadMoreMessages={loadMoreMessages}
          seenChat={this.seenChat}
          selectedChat={selectedChat}
        />
        <ChatBox 
          onNewMessageEntered={this.props.onNewMessageEntered}
        />
      </Wrapper>
    )
  }
}

export default MessageSection;