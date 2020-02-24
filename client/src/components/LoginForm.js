import React from 'react';
import { Link } from 'react-router-dom';

import APIService from '../libs/apiService';

class LoginForm extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
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
    APIService.login(formData)
      .then((res) => {
        if (res.status === 200) {
          this.props.onLoginSuccess(res.data.accessToken, res.data.user);
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
          <Link to='/sign-up'>Don't have an account? Sign Up</Link>
          <button
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    )
  }
}

export default LoginForm;