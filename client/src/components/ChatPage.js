import React from 'react';
import styled from 'styled-components';

import ChatsSection from './ChatsSection';
import MessageSection from './MessageSection';

import APIService from '../libs/apiService';

const Wrapper = styled.div`
  display: flex;
`;

class ChatPage extends React.Component {
  state = {
    chats: [],
    selectedChat: null,
  }

  componentDidMount() {
    APIService.getChats()
      .then(res => {
        this.setState({ 
          chats: res.data,
          selectedChat: res.data[0]
        });
      });
  }

  selectChat = (chat) => {
    this.setState({ selectedChat: chat });
  }

  render() {
    const { chats, selectedChat } = this.state;
    const { user } = this.props;

    if (chats.length === 0) return null;

    return (
      <Wrapper>
        <ChatsSection 
          user={user}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={this.selectChat}
        />
        <MessageSection />
      </Wrapper>
    )
  }
}

export default ChatPage;