import React from 'react';
import APIService from '../libs/apiService';

class LoginForm extends React.Component {
  state = {
    formData: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  handleInputChange = (e) => {
    const { formData } = this.state;
    formData[e.target.name] = e.target.value;
    this.setState({ formData });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    APIService.signUp(formData)
      .then((res) => {
        if (res.status === 200) {
          this.props.onSignUpSuccess(res.data.accessToken, res.data.user);
        } else {
          console.log(res);
        }
      }, (error) => {
        console.log(error);
      })
  }

  render() {
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={this.handleInputChange}
            required
          >
          </input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={this.handleInputChange}
            required
          >
          </input>
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={this.handleInputChange}
            required
          >
          </input>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={this.handleInputChange}
            required
          >
          </input>
        </div>
        <div>
          <button
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    )
  }
}

export default LoginForm;