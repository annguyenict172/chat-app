import React from 'react';
import styled from 'styled-components';

import ChatsSectionHeader from './ChatsSectionHeader';
import SearchBar from './SearchBar';
import ChatList from './ChatList';

const Wrapper = styled.div`
  width: 25%;
  @media (max-width: 1000px) {
    width: 250px;
  }
`;

const ScrollableSection = styled.div`
  height: calc(100vh - 70px);
  overflow: scroll;
`;

class ChatsSection extends React.Component {
  render() {
    const { chats, onSelectChat, selectedChat, user, onLogOut } = this.props;

    return (
      <Wrapper>
        <ChatsSectionHeader 
          user={user} 
          onLogOut={onLogOut}
        />
        <ScrollableSection>
          <SearchBar />
          <ChatList
            user={user}
            chats={chats}
            onSelectChat={onSelectChat}
            selectedChat={selectedChat}
          />
        </ScrollableSection>
      </Wrapper>
    )
  }
}

export default ChatsSection;