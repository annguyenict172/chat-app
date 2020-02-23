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
    messages: []
  }

  getChats = (getFirstChatMessages) => {
    APIService.getChats()
      .then(res => {
        this.setState({ 
          chats: res.data,
          selectedChat: res.data[0]
        });
        if (getFirstChatMessages) {
          this.getMessages(res.data[0]._id);
        };
      });
  }

  getMessages = (chatId) => {
    APIService.getMessages(chatId)
      .then(res => {
        this.setState({ 
          messages: res.data,
        });
      });
  }

  componentDidMount() {
    this.getChats(true);
  }

  selectChat = (chat) => {
    this.setState({ selectedChat: chat });
    this.getMessages(chat._id);
  }

  render() {
    const { chats, selectedChat, messages } = this.state;
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
        <MessageSection 
          messages={messages}
          user={user}
        />
      </Wrapper>
    )
  }
}

export default ChatPage;