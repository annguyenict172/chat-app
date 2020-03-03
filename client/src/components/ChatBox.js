import React from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faSmile } from '@fortawesome/free-solid-svg-icons';


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

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 20px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const FileInput = styled.input`
  visibility: hidden;
  height: 0;
  width: 0;
`;

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showEmojiPicker: false,
      imageFile: null
    }
    this.fileInput = React.createRef();
  }

  onSelectFile = (e) => {
    this.setState({ 
      imageFile: URL.createObjectURL(e.target.files[0])
    });
  }

  onInputChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;
    if (message.length === 0 || !message.trim()) return;
    this.props.onNewMessageEntered(this.state.message);
    this.setState({ message: '' });
  }

  onEmojiPickerClick = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  }

  onEmojiSelect = (emojiObj) => {
    const { message } = this.state;
    const text = `${message} ${emojiObj.native}`;
    this.setState({ 
      message: text
    });
  }

  onImageUploadClick = () => {
    this.fileInput.current.click();
  }

  render() {
    const { showEmojiPicker } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <ButtonWrapper onClick={this.onEmojiPickerClick}>
          <Button >
            <Icon icon={faSmile} />
          </Button>
          { showEmojiPicker === true &&
            <PickerWrapper>
              <Picker 
                darkMode={false}
                set='emojione'
                onSelect={this.onEmojiSelect}
                showPreview={false}
              />
            </PickerWrapper>
          }
        </ButtonWrapper>
        <ButtonWrapper onClick={this.onImageUploadClick}>
          <Button >
            <Icon icon={faFileImage} />
          </Button>
          <FileInput
            name="image"
            type="file"
            accept="image/*"
            ref={this.fileInput}
            onChange={this.onSelectFile}
          />
        </ButtonWrapper>
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