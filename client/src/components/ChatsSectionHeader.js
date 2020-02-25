import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons';


const Wrapper = styled.div`
  padding: 8px 16px 8px 16px;
  display: flex;
  height: 52px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
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

const Heading = styled.span`
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  flex-grow: 1;
`;

const PopUp = styled.div`
  border-radius: 5px;
  position: absolute;
  background-color: #fff;
  width: 150px;
  top: 20;
  left: 10px;
  z-index: 1000;
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
`;

const PopUpItemList = styled.ul`
  list-style: none;
  padding-left: 15px;
  font-size: 13px;
`;

const Link = styled.a`
  cursor: pointer;
`;

class ChatsSectionHeader extends React.Component {
  state = {
    showSettingPopUp: false
  }

  onSettingClick = () => {
    this.setState({ showSettingPopUp: !this.state.showSettingPopUp });
  }

  render() {
    const { showSettingPopUp } = this.state;
    const { user, onLogOut, onNewChatClick } = this.props;
    return (
      <Wrapper>
        <Avatar size={40} name={user.firstName}/>
        <Heading>Chats</Heading>
        <ButtonWrapper>
          <Button onClick={this.onSettingClick}>
            <Icon icon={faCog} />
          </Button>
          { showSettingPopUp && 
            <PopUp>
              <PopUpItemList>
                <li>
                  <Link onClick={onLogOut}>Log Out</Link>
                </li>
              </PopUpItemList>
            </PopUp>
          }
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={onNewChatClick}>
            <Icon icon={faEdit} />
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default ChatsSectionHeader;