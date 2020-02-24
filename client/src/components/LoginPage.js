import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

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

const SignUpLinkWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px;
`;

const Hidden = styled.div`
  visibility: hidden;
  padding-top: 20vh;
`;

class LoginPage extends React.Component {
  render() {
    return (
      <Background>
        <Hidden />
        <LoginForm onLoginSuccess={this.props.onLoginSuccess} />
        <SignUpLinkWrapper>
          <Span>Don't have an account? </Span>
          <StyledLink to='/sign-up'>Sign Up</StyledLink>
        </SignUpLinkWrapper>
      </Background>
    )
  }
}

export default LoginPage;