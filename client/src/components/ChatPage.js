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
    messages: [],
    newChat: false
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

  handleNewMessageEnter = (message) => {
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

    let { selectedChat } = this.state;
    if (selectedChat._id === 'new') {
      // If this chat does not exist on our database
      APIService.createNewChat(selectedChat.participants, selectedChat.participantNames)
        .then(res => {
          selectedChat = {
            ...res.data,
            lastMessage: message,
            lastMessageTimestamp: new Date().getTime()
          }
          let chats = this.state.chats.filter(chat => chat._id !== 'new');
          
          chats.unshift(selectedChat);
          this.setState({
            chats: chats,
            selectedChat: selectedChat
          })
          APIService.sendNewMessage(this.state.selectedChat._id, message);
        })
    } else {
      // If this chat exists already
      selectedChat = {
        ...selectedChat,
        lastMessage: message,
        lastMessageTimestamp: new Date().getTime()
      }
      let chats = this.state.chats.filter(chat => chat._id !== selectedChat._id);
      
      chats.unshift(selectedChat);
      this.setState({
        chats: chats,
        selectedChat: selectedChat
      })
      APIService.sendNewMessage(this.state.selectedChat._id, message);
    }
  }

  handleNewChatClick = () => {
    let chats = [...this.state.chats];
    const newChat = {
      _id: 'new',
    }
    chats.unshift(newChat);
    this.setState({
      chats: chats,
      selectedChat: newChat,
      newChat: true,
      messages: []
    })
  }

  handleNewChatCancel = () => {
    let chats = this.state.chats.filter(chat => chat._id !== 'new');
    this.setState({
      chats: chats,
      newChat: false,
    })
    if (chats.length) {
      this.selectChat(chats[0]);
    } else {
      this.setState({
        selectedChat: null
      })
    }
  }

  handleSelectUser = (user) => {
    APIService.getChats({ with: user._id })
      .then(res => {
        if (res.data.length > 0) {
          // If this chat exists on our database
          let chats = this.state.chats.filter(chat => chat._id !== 'new');
          this.setState({
            chats: chats,
            newChat: false,
          })
          this.selectChat(res.data[0]);
        } else {
          // If this chat does not exist yet
          let chats = [...this.state.chats];
          let selectedChat;
          for (let i = 0; i < chats.length; i++) {
            if (chats[i]._id === 'new') {
              chats[i].participants = [this.props.user._id, user._id];
              chats[i].participantNames = {
                [this.props.user._id]: this.props.user.fullName,
                [user._id]: user.fullName
              }
              selectedChat = chats[i];
            }
            this.setState({
              chats: chats,
              newChat: false,
              selectedChat: selectedChat
            })
          }
        }
      })
  }

  render() {
    const { chats, selectedChat, messages, newChat } = this.state;
    const { user, onLogOut } = this.props;

    return (
      <Wrapper>
        <ChatsSection 
          onLogOut={onLogOut}
          user={user}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={this.selectChat}
          onNewChatClick={this.handleNewChatClick}
          onNewChatCancel={this.handleNewChatCancel}
        />
        <MessageSection 
          selectedChat={selectedChat}
          messages={messages}
          user={user}
          onNewMessageEntered={this.handleNewMessageEnter}
          newChat={newChat}
          onSelectUser={this.handleSelectUser}
        />
      </Wrapper>
    )
  }
}

export default ChatPage;