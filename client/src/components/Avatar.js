import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  display: inline-block;
  position: relative;
  background-color: #eaeaea;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
`;

const InitialCharName = styled.span`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: black;
  font-size: ${props => `${props.size - 15}px`};
  font-weight: bold;
`;

class Avatar extends React.Component {
  render() {
    const { size, name } = this.props;

    return (
      <Circle size={size}>
        <InitialCharName size={size}>
          {name[0]}
        </InitialCharName>
      </Circle>
    )
  }
}

export default Avatar;