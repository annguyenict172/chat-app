import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <LoginForm onLoginSuccess={this.props.onLoginSuccess} />
      </div>
    )
  }
}

export default LoginPage;