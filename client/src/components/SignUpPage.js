import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

const StyledLink = styled(Link)`
  color: white;
  text-decoration: underline;
  font-weight: bold;
  font-size: 17px;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0B93F6;
`

const Span = styled.span`
  color: white;
  font-size: 17px;
`;

const LoginLinkWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px;
`;

const Hidden = styled.div`
  visibility: hidden;
  padding-top: 12vh;
`;

class SignUpPage extends React.Component {
  render() {
    return (
      <Background>
        <Hidden />
        <SignUpForm onSignUpSuccess={this.props.onSignUpSuccess} />
        <LoginLinkWrapper>
          <Span>Already have an account? </Span>
          <StyledLink to='/'>Log In</StyledLink>
        </LoginLinkWrapper>
      </Background>
    )
  }
}

export default SignUpPage;