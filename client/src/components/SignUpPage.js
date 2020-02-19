import React from 'react';
import SignUpForm from './SignUpForm';

class SignUpPage extends React.Component {
  render() {
    return (
      <div>
        <SignUpForm onSignUpSuccess={this.props.onSignUpSuccess} />
      </div>
    )
  }
}

export default SignUpPage;