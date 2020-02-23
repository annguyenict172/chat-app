import React from 'react';
import styled from 'styled-components';

const MessageStyle = styled.div`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 10px;
  line-height: 20px;
  position:relative;
	padding:10px 20px;
  border-radius:25px;
  font-size: 15px;
  
  &:before, &:after {
    content:"";
		position:absolute;
    bottom:-2px;
    height:20px;
  }
`;

const MyMessage = styled(MessageStyle)`
  color:white; 
  background:#0B93F6;
  align-self: flex-end;
    
  &:before {
    right:-7px;
    border-right:20px solid #0B93F6;
    border-bottom-left-radius: 16px 14px;
    transform:translate(0, -2px);
  }

  &:after {
    right:-56px;
    width:26px;
    background:white;
    border-bottom-left-radius: 10px;
    transform:translate(-30px, -2px);
  }
`;

const YourMessage = styled(MessageStyle)`
  background:#e0e0e0;
  color:black;
    
  &:before {
    left:-7px;
    border-left:20px solid #e0e0e0;
    border-bottom-right-radius: 16px 14px;
    transform:translate(0, -2px);
  }

  &:after {
    left:4px;
    width:26px;
    background:white;
    border-bottom-right-radius: 10px;
    transform:translate(-30px, -2px);
  }
`;

class Message extends React.Component {
  render() {
    const { user, message } = this.props;
    if (message.senderId === user._id) {
      return <MyMessage>{message.text}</MyMessage>;
    } else {
      return <YourMessage>{message.text}</YourMessage>;
    }
  }
}

export default Message;