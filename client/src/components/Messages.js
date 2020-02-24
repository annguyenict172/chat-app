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

class Messages extends React.Component {
  render() {
    const { user, messages } = this.props;
    return (
      <Wrapper>
        {messages.map(message => (
          <Message
            key={message._id}
            user={user}
            message={message}
          />
        ))}
      </Wrapper>
    )
  }
}

export default Messages;