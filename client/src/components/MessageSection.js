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
  render() {
    const { messages, user, selectedChat } = this.props;
    return (
      <Wrapper>
        <MessageSectionHeader 
          user={user}
          selectedChat={selectedChat} 
        />
        <Messages 
          user={user}
          messages={messages}
        />
        <ChatBox 
          onNewMessageEntered={this.props.onNewMessageEntered}
        />
      </Wrapper>
    )
  }
}

export default MessageSection;