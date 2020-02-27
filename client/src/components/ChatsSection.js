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
  onScroll = (e) => {
    const atBottom = e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight;
    if (atBottom) {
      this.props.loadMoreChats();
    }
  }

  render() {
    const { 
      chats, 
      onSelectChat, 
      selectedChat, 
      user, 
      onLogOut,
      onNewChatClick,
      onNewChatCancel,
      newChat
    } = this.props;

    return (
      <Wrapper>
        <ChatsSectionHeader 
          newChat={newChat}
          user={user} 
          onLogOut={onLogOut}
          onNewChatClick={onNewChatClick}
        />
        <ScrollableSection onScroll={this.onScroll}>
          {/* <SearchBar /> */}
          <ChatList
            onNewChatCancel={onNewChatCancel}
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