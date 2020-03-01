import React from 'react';
import styled from 'styled-components';

import ChatsSection from './ChatsSection';
import MessageSection from './MessageSection';

import APIService from '../libs/apiService';
import chatService from '../libs/chatService';

const Wrapper = styled.div`
  display: flex;
`;

const generateRandomString = (length) => {
  return Math.random().toString(36).substr(2, length);
}

class ChatPage extends React.Component {
  state = {
    chats: [],
    selectedChat: null,
    messages: [],
    newChat: false
  }

  handleComingMessage = (data) => {
    let { chats, selectedChat, messages } = this.state;

    let filteredChats = chats.filter(c => c._id !== data.chat._id)
    // Chat does not exist in current list
    if (filteredChats.length === chats.length) {
      chats = [data.chat, ...chats];
    } else {
      // Chat exists in current list
      // Active
      if (selectedChat._id === data.chat._id) {
        messages = [...messages, data.message];
        selectedChat = data.chat;
        for (let i = 0; i < chats.length; i++) {
          if (chats[i]._id === data.chat._id) {
            chats[i] = data.chat;
          }
        }
        this.seenChat(selectedChat);
      } else {
        // Not active
        chats = filteredChats;
        chats.unshift(data.chat);
      }
    }
    this.setState({
      chats: chats,
      selectedChat: selectedChat,
      messages: messages
    })
  }

  connectToChatService = () => {
    APIService.connectToChatService()
      .then(res => {
        chatService.connect(this.props.user._id);
        chatService.addListener(this.handleComingMessage);
      });
  }

  getChats = (getFirstChatMessages) => {
    APIService.getChats()
      .then(res => {
        this.setState({ 
          chats: res.data,
          selectedChat: res.data[0]
        });
        if (getFirstChatMessages && res.data.length) {
          this.seenChat(res.data[0]);
          this.getMessages(res.data[0]._id);
        };
      });
  }

  getMessages = (chatId) => {
    const offset = this.state.messages.length;
    APIService.getMessages(chatId, 0)
      .then(res => {
        this.setState({ 
          messages: res.data,
        });
      });
  }

  componentDidMount() {
    this.connectToChatService();
    this.getChats(true);
  }

  componentWillUnmount() {
    chatService.removeListener(this.handleComingMessage);
    chatService.disconnect();
  }

  selectChat = (chat) => {
    this.setState({ selectedChat: chat });
    this.getMessages(chat._id);
    this.seenChat(chat);
  }

  seenChat = (chat) => {
    APIService.seenChat(chat._id).then(res => {
      let chats = [...this.state.chats];
      for (let i = 0; i < chats.length; i++) {
        if (chats[i]._id === chat._id) {
          if (!chats[i].seen.includes(this.props.user._id)) {
            chats[i].seen.push(this.props.user._id);
          }
        }
      }
      this.setState({
        chats: chats
      })
    });
  }

  handleNewMessageEnter = (message) => {
    // Push new message into the message list
    let messages = [...this.state.messages];
    messages.push({
      _id: generateRandomString(12),
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

  loadMoreMessages = () => {
    const offset = this.state.messages.length;
    APIService.getMessages(this.state.selectedChat._id, offset)
      .then(res => {
        this.setState({ 
          messages: [...res.data, ...this.state.messages],
        });
      });
  }

  loadMoreChats = () => {
    APIService.getChats({ offset: this.state.chats.length })
      .then(res => {
        this.setState({ 
          chats: [...this.state.chats, ...res.data],
        });
      });
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
          loadMoreChats={this.loadMoreChats}
          newChat={newChat}
        />
        <MessageSection 
          selectedChat={selectedChat}
          messages={messages}
          user={user}
          onNewMessageEntered={this.handleNewMessageEnter}
          newChat={newChat}
          onSelectUser={this.handleSelectUser}
          loadMoreMessages={this.loadMoreMessages}
        />
      </Wrapper>
    )
  }
}

export default ChatPage;