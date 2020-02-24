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
        if (getFirstChatMessages && res.data.length) {
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

  onNewMessageEntered = (message) => {
    // Push new message into the message list
    let messages = [...this.state.messages];
    messages.push({
      senderId: this.props.user._id,
      chatId: this.state.selectedChat._id,
      text: message
    });
    this.setState({
      messages: messages
    })

    // Call API to send this message on server
    APIService.sendNewMessage(this.state.selectedChat._id, message)
  }

  render() {
    const { chats, selectedChat, messages } = this.state;
    const { user, onLogOut } = this.props;

    return (
      <Wrapper>
        <ChatsSection 
          onLogOut={onLogOut}
          user={user}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={this.selectChat}
        />
        <MessageSection 
          messages={messages}
          user={user}
          onNewMessageEntered={this.onNewMessageEntered}
        />
      </Wrapper>
    )
  }
}

export default ChatPage;