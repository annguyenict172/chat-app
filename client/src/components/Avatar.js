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
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
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
    const { size, userId } = this.props;
    let imageSource;
    if (userId) {
      imageSource = `https://res.cloudinary.com/dznlmu2gs/image/upload/${userId}.jpg`;
    }

    return (
      <Circle size={size}>
        { userId ? (
          <Image src={imageSource} />
        ) : (
          <DefaultUserIcon icon={faUser} size="lg" />
        )}
      </Circle>
    )
  }
}

export default Avatar;