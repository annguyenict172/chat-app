import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

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

const Form = styled.form`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-right: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  flex: 1;
  font-size: 14px;

  :focus {
    outline: none;
  }
`;

class ChatBox extends React.Component {
  state = {
    message: ''
  }

  onInputChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onNewMessageEntered(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Button>
          <Icon icon={faFileImage} />
        </Button>
        <Input 
          placeholder="Type a message..."
          onChange={this.onInputChange}
          value={this.state.message}
        />
      </Form>
    )
  }
}

export default ChatBox;