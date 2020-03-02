import React from 'react';
import styled from 'styled-components';

import Message from './Message';
import { getMessageDividerTimeString, isSameDate } from '../libs/datetime';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 142px);
  overflow: scroll;
  padding: 8px 16px 8px 16px;
`;

const MessageEndHook = styled.div`
  height: 0;
  width: 0;
`;

const TimeDivider = styled.div`
  font-size: 12px;
  color: grey;
  width: 100%;
  text-align: center;
  padding: 10px 0px 20px 0px;
`;

const SeenIndicator = styled.span`
  float: right;
  margin-left: auto;
  font-size: 12px;
  color: grey;
  padding-right: 10px;
`;

class Messages extends React.Component {
  componentDidUpdate(prevProps, prevStates) {
    if (this.props.messages.length === 0) {
      return;
    } else if (prevProps.messages.length === 0 && this.props.messages.length > 0) {
      this.scrollToBottom();
    } else if (prevProps.messages.length && prevProps.messages[0].chatId === this.props.messages[0].chatId) {
      this.scrollToBottom();
    } else if (
      prevProps.messages[prevProps.messages.length - 1] !== this.props.messages[this.props.messages.length - 1]
      && prevProps.messages[prevProps.messages.length - 1] === this.props.messages[this.props.messages.length - 2]
    ) {
      const atBottom = this.wrapper.clientHeight + this.wrapper.scrollTop + 80 >= this.wrapper.scrollHeight;
      if (atBottom) {
        this.scrollToBottom();
      }
    } else if (prevProps.messages[0] !== this.props.messages[0]) {
      const numOfNewMessages = this.props.messages.length - prevProps.messages.length;
      let numOfMessageDividers = 0;
      for (let i = 0; i <= numOfNewMessages; i++) {
        if (i === 0) continue;
        if (!isSameDate(this.props.messages[i].createdAt, this.props.messages[i-1].createdAt)) {
          numOfMessageDividers++;
        }
      }
      this.wrapper.scrollTop = 50 * (numOfNewMessages) + 45 * (numOfMessageDividers);
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  onScroll = (e) => {
    const atTop = e.target.scrollTop === 0;
    if (atTop) {
      this.props.loadMoreMessages();
    }
  }

  render() {
    const { user, messages, selectedChat } = this.props;

    if (selectedChat == null || !messages.length) {
      return <Wrapper></Wrapper>;
    }
    let peerId;
    selectedChat.participants.forEach(participant => {
      if (participant !== user._id) {
        peerId = participant;
      }
    })

    const peerHasSeen = selectedChat.seen.includes(peerId);
    
    return (
      <Wrapper 
        onScroll={this.onScroll}
        ref={(el) => { this.wrapper = el; }}
      >
        {messages.map((message, index) => {
          if (index === 0 || !isSameDate(messages[index - 1].createdAt, message.createdAt)) {
            return (
              <React.Fragment key={message._id}>
                <TimeDivider>
                  {getMessageDividerTimeString(message.createdAt)}
                </TimeDivider>
                <Message
                  user={user}
                  message={message}
                />
              </React.Fragment>
            )
          } else {
            return (
              <Message
                key={message._id}
                user={user}
                message={message}
              />
            )
          }
        })}
        { peerHasSeen && messages[messages.length - 1].senderId === user._id && 
          <SeenIndicator>Seen</SeenIndicator>
        }
        <MessageEndHook ref={(el) => { this.messagesEnd = el; }} />
      </Wrapper>
    )
  }
}

export default Messages;