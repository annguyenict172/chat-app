import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons';


const Wrapper = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
`;

const Button = styled.a`
  display: inline-block;
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #eaeaea;
  cursor: pointer;
  margin-right: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Heading = styled.span`
  margin-left: 5px;
  font-size: 25px;
  font-weight: bold;
  flex-grow: 1;
`;

class ChatsSectionHeader extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Wrapper>
        <Avatar size={40} name={user.firstName}/>
        <Heading>Chats</Heading>
        <Button>
          <Icon icon={faCog} />
        </Button>
        <Button>
          <Icon icon={faEdit} />
        </Button>
      </Wrapper>
    )
  }
}

export default ChatsSectionHeader;