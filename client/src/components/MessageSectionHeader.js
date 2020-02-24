import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';


const Wrapper = styled.div`
  padding: 8px 16px 8px 16px;
  display: flex;
  height: 52px;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
`;

const Button = styled.a`
  display: inline-block;
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #eaeaea;
  cursor: pointer;
  margin-left: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Username = styled.span`
  margin-left: 10px;
  font-size: 17px;
  font-weight: bold;
  flex-grow: 1;
`;

class MessageSectionHeader extends React.Component {
  render() {
    const { selectedChat, user } = this.props;
    let peerName;

    if (selectedChat) {
      Object.keys(selectedChat.participantNames).forEach(userId => {
        if (userId !== user._id) {
          peerName = selectedChat.participantNames[userId];
          return;
        }
      })
    }
    
    return (
      <Wrapper>
        {
          selectedChat &&
          <React.Fragment>
            <Avatar size={40} name={peerName} />
            <Username>{peerName}</Username>
          </React.Fragment>
        }
        <Button>
          <Icon icon={faInfo} />
        </Button>
      </Wrapper>
    )
  }
}

export default MessageSectionHeader;