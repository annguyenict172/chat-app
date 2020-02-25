import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #e0e0e0;
  border-radius: 20px;
`;

const TextWrapper = styled.div`
  margin-left: 15px;
  flex-grow: 1
`;

const Button = styled.a`
  margin-right: 10px;
  display: inline-block;
  position: relative;
  height: 20px;
  width: 20px;
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

const AvatarWrapper = styled.div`
  margin-left: 10px;
`;

const Span = styled.span`
  font-size: 15px;
`;

class NewChat extends React.Component {
  render() {
    return (
      <Wrapper>
        <AvatarWrapper>
          <Avatar size={50} />
        </AvatarWrapper>
        <TextWrapper>
          <Span>New message</Span>
        </TextWrapper>
        <Button onClick={this.props.onNewChatCancel}>
          <Icon icon={faTimes} size="xs"/>
        </Button>
      </Wrapper>
    )
  }
}

export default NewChat;