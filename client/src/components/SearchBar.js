import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 300px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  width: 90%;
  margin: 0px auto;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  padding: 0.5rem;
`;

const SearchBox = styled.input`
  border: 0;
  padding: 0.5rem 0.5rem 0.5rem 0;
  flex: 1;
  font-size: 14px;

  :focus {
    outline: none;
  }
`;

class ChatsSectionHeader extends React.Component {
  render() {
    return (
      <Wrapper>
        <SearchIcon icon={faSearch} />
        <SearchBox placeholder="Search messages" />
      </Wrapper>
    )
  }
}

export default ChatsSectionHeader;