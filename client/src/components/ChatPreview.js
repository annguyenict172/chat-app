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

const ChatName = styled.div`
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
  white-space: nowrap;
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
    let peerIds = chat.participants.filter(p => p !== user._id);
    let peerNames = peerIds.map(id => chat.participantNames[id]);
    const iHaveSeen = chat.seen.includes(user._id);
    const peerHasSeen = chat.seen.includes(peerIds[0]);
    const chatName = peerNames.join(', ');

    return (
      <Wrapper 
        onClick={this.onSelectChat}
        active={active}
      >
        <AvatarWrapper>
          <Avatar size={50} userId={peerIds[0]} />
        </AvatarWrapper>
        <TextWrapper>
          <ChatName seen={iHaveSeen}>{chatName}</ChatName>
          <LastMessageWrapper seen={iHaveSeen}>
            <LastMessage>
              {chat.lastMessageSender === user._id ? 'You: ' + chat.lastMessage : chat.lastMessage}
            </LastMessage> • {getLastMessageTimeString(chat.lastMessageTimestamp)}
          </LastMessageWrapper>
        </TextWrapper>
        { !iHaveSeen && 
          <IconWrapper>
            <NewIcon />
          </IconWrapper>
        }
        { iHaveSeen && peerHasSeen && chat.lastMessageSender === user._id &&
          <IconWrapper>
            <Avatar size={15} userId={peerIds[0]} />
          </IconWrapper>
        }      
      </Wrapper>
    )
  }
}

export default ChatPreview;