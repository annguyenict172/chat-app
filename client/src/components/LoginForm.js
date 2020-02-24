import React from 'react';
import styled from 'styled-components';

import APIService from '../libs/apiService';

const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  height: 350px;
  background-color: white;
`;

const FormTitle = styled.h1`
  margin: 0;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 15px;
`;

const FormGroup = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 15px;
`;

const Input = styled.input`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 15px;

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px;
  width: 100%;
  background: #15CD72;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

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
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>
          Sign In
        </FormTitle>

        <FormGroup>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Button
            type="submit"
          >
            Log In
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default LoginForm;