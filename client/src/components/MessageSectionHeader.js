import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '../libs/debouce';
import APIService from '../libs/apiService';


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

const InputWrapper = styled.span`
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  border: none;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  font-size: 15px;

  :focus {
    outline: none;
  }
`;

const PopUp = styled.div`
  border-radius: 5px;
  position: absolute;
  background-color: white;
  padding: 0px 10px 0px 0px;
  top: 20;
  left: 20;
  z-index: 1000;
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
`;

const UserSearchResults = styled.ul`
  list-style: none;
  padding-left: 10px;
`;

const Result = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 5px;
  cursor: pointer;
`;

const Name = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

const Email = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;

function MessageSectionHeader(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        APIService.searchUsers(debouncedSearchTerm)
        .then(res => {
          setResults(res.data);
        })
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const { 
    user,
    selectedChat, 
    newChat,
    onSelectUser
  } = props;

  if (selectedChat == null && !newChat) return <Wrapper></Wrapper>;

  if (!newChat) {
    let peerIds = selectedChat.participants.filter(p => p !== user._id);
    let peerNames = peerIds.map(id => selectedChat.participantNames[id]);
    const chatName = peerNames.join(', ');
    
    return (
      <Wrapper>
        {
          selectedChat &&
          <React.Fragment>
            <Avatar size={40} userId={peerIds[0]} />
            <Username>{chatName}</Username>
            <Button>
              <Icon icon={faInfo} />
            </Button>
          </React.Fragment>
        }
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <span>To: </span>
        <InputWrapper>
          <Input 
            autoFocus
            placeholder="Type the name or the email of a person"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          { results.length > 0 && 
            <PopUp>
              <UserSearchResults>
                { results.map(user => (
                  <Result 
                    key={user._id} 
                    onClick={() => onSelectUser(user)}
                  >
                    <Avatar size={40} userId={user._id} /> 
                    <Name>{user.firstName} {user.lastName}</Name> 
                    <Email>({user.email})</Email>
                  </Result>
                ))}
              </UserSearchResults>
            </PopUp>
          }
        </InputWrapper>
      </Wrapper>
    )
  }
}

export default MessageSectionHeader;