import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 75%;
  @media (max-width: 1000px) {
    width: calc(100% - 250px);
  }
`;

class MessageSection extends React.Component {
  render() {
    return (
      <Wrapper>
        <h1>Chat Detail</h1>
      </Wrapper>
    )
  }
}

export default MessageSection;