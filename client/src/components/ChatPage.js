import React from 'react';
import styled from 'styled-components';

import ChatList from './ChatList';
import ChatDetail from './ChatDetail';

const Wrapper = styled.div`
  width: 95vw;
  margin: 0 auto;
`;

const ChatListWrapper = styled.div`
  width: 30%;
  display: inline-block;
`;

const ChatDetailWrapper = styled.div`
  width: 70%;
  display: inline-block;
`;

class ChatPage extends React.Component {
  render() {
    return (
      <Wrapper>
        <ChatListWrapper>
          <ChatList />
        </ChatListWrapper>
        <ChatDetailWrapper>
          <ChatDetail/>
        </ChatDetailWrapper>
      </Wrapper>
    )
  }
}

export default ChatPage;