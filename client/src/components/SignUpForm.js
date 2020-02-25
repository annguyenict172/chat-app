import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import APIService from '../libs/apiService';

const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  padding: 25px 0px;
  background-color: white;
  border-radius: 5px;
`;

const FormTitle = styled.h1`
  margin: 0;
  text-align: center;
  padding-bottom: 15px;
`;

const FormGroup = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 10px;
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

class SignUpForm extends React.Component {
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
          toast.error(res.data.errorMessage);
        }
      }, (error) => {
        toast.error(error);
      })
  }

  render() {
    const { formData } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormTitle>
          Sign Up
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
          <Input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={this.handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Button
            type="submit"
          >
            Sign Up
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default SignUpForm;