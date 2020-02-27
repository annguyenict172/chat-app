import React from 'react';
import styled from 'styled-components';

import Message from './Message';

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

class Messages extends React.Component {
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.messages.length === 0 && this.props.messages.length > 0) {
      this.scrollToBottom();
    } else if (prevProps.messages[prevProps.messages.length - 1] !== this.props.messages[this.props.messages.length - 1]) {
      this.scrollToBottom();
    } else if (prevProps.messages[0] !== this.props.messages[0]) {
      const numOfNewMessages = this.props.messages.length - prevProps.messages.length;
      this.wrapper.scrollTop = 50 * (numOfNewMessages);
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
    const { user, messages } = this.props;
    return (
      <Wrapper 
        onScroll={this.onScroll}
        ref={(el) => { this.wrapper = el; }}
      >
        {messages.map(message => (
          <Message
            key={message._id}
            user={user}
            message={message}
          />
        ))}
        <MessageEndHook ref={(el) => { this.messagesEnd = el; }} />
      </Wrapper>
    )
  }
}

export default Messages;