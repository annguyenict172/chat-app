import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
  font-size: ${props => `${props.size * 0.5}px`};
  font-weight: bold;
`;

const DefaultUserIcon = styled(FontAwesomeIcon)`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 80%;
  height: auto;
`;

class Avatar extends React.Component {
  render() {
    const { size, name } = this.props;

    return (
      <Circle size={size}>
        { name ? (
          <InitialCharName size={size}>
            {name[0]}
          </InitialCharName>
        ) : (
          <DefaultUserIcon icon={faUser} size="lg" />
        )}
      </Circle>
    )
  }
}

export default Avatar;