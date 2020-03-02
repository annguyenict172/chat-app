import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { getLastMessageTimeString } from '../libs/datetime';

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

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const Username = styled.div`
  font-size: ${props => props.seen ? '15px' : '15.5px'};
  font-weight: ${props => props.seen ? '100' : 'bold'};
`;

const LastMessageWrapper = styled.div`
  font-size: ${props => props.seen ? '12px' : '12.5px'};
  display: flex;
  align-items: center;
  font-weight: ${props => props.seen ? '100' : 'bold'};
  color: ${props => props.seen ? 'grey' : 'black'};
`;

const LastMessage = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  display: inline-block;
  margin-right: 5px;
`;

const AvatarWrapper = styled.div`
  margin-left: 10px;
`;

const NewIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #0B93F6;
`;

class ChatPreview extends React.Component {
  onSelectChat = () => {
    const { chat, onSelectChat } = this.props;
    onSelectChat(chat);
  }

  render() {
    const { chat, active, user } = this.props;
    let peerName;
    let peerId;
    Object.keys(chat.participantNames).forEach(userId => {
      if (userId !== user._id) {
        peerName = chat.participantNames[userId];
        peerId = userId;
        return;
      }
    })
    const iHaveSeen = chat.seen.includes(user._id);
    const peerHasSeen = chat.seen.includes(peerId);

    return (
      <Wrapper 
        onClick={this.onSelectChat}
        active={active}
      >
        <AvatarWrapper>
          <Avatar size={50} name={peerName} />
        </AvatarWrapper>
        <TextWrapper>
          <Username seen={iHaveSeen}>{peerName}</Username>
          <LastMessageWrapper seen={iHaveSeen}>
            <LastMessage>{chat.lastMessage}</LastMessage> • {getLastMessageTimeString(chat.lastMessageTimestamp)}
          </LastMessageWrapper>
        </TextWrapper>
        { !iHaveSeen && 
          <IconWrapper>
            <NewIcon />
          </IconWrapper>
        }
        { iHaveSeen && peerHasSeen && 
          <IconWrapper>
            <Avatar size={20} name={peerName}/>
          </IconWrapper>
        }      
      </Wrapper>
    )
  }
}

export default ChatPreview;