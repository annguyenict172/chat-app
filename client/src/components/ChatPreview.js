import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active !== false ? '#e0e0e0' : '#fff'};
  border-radius: 20px;
`;

const TextWrapper = styled.div`
  margin-left: 15px;
  flex-grow: 1
`;

const SeenIcon = styled.div`
  margin-right: 10px;
`;

const Username = styled.div`
  font-size: 15px;
`;

const LastMessage = styled.div`
  font-size: 12px;
  font-weight: 100;
  color: grey;
`;

const AvatarWrapper = styled.div`
  margin-left: 10px;
`;

class ChatPreview extends React.Component {
  onSelectChat = () => {
    const { chat, onSelectChat } = this.props;
    onSelectChat(chat);
  }

  render() {
    const { chat, active, user } = this.props;
    let peerName;
    Object.keys(chat.participantNames).forEach(userId => {
      if (userId !== user._id) {
        peerName = chat.participantNames[userId];
        return;
      }
    })

    return (
      <Wrapper 
        onClick={this.onSelectChat}
        active={active}
      >
        <AvatarWrapper>
          <Avatar size={50} name={peerName} />
        </AvatarWrapper>
        <TextWrapper>
          <Username>{peerName}</Username>
          <LastMessage>
            {chat.lastMessage} • 15:00
          </LastMessage>
        </TextWrapper>
        <SeenIcon>
          <Avatar size={20} name={peerName} />
        </SeenIcon>
      </Wrapper>
    )
  }
}

export default ChatPreview;