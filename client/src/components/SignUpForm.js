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

const AvatarPreviewWrapper = styled.div`
	height: 100px;
	width: 100px;
	margin: 10px auto;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 1px 1px 15px -5px black;
  cursor: pointer;
  background: white;
`;

const AvatarPreview = styled.img`
  height: 100%;
  width: 100%;
`;

const FileInput = styled.input`
  visibility: hidden;
`;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      },
      imageFile: 'user-icon.png',
      isLoading: false
    }
    this.fileInput = React.createRef();
  }
  
  handleInputChange = (e) => {
    const { formData } = this.state;
    if (e.target.name === 'avatar') {
      this.setState({ 
        imageFile: URL.createObjectURL(e.target.files[0])
      });
    } else {
      formData[e.target.name] = e.target.value;
      this.setState({ formData });
    }
  }

  onAvatarPreviewClick = () => {
    this.fileInput.current.click();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...this.state.formData };

    if (this.state.imageFile === 'user-icon.png') {
      toast.error('Please upload your profile image');
      return;
    }

    formData.avatar = this.fileInput.current.files[0];
    if (formData.avatar.size > 5000000) {
      toast.error('The maximum size for your profile image is 5MB');
      return;
    }

    this.setState({ isLoading: true });
    APIService.signUp(formData)
      .then(res => {
        this.props.onSignUpSuccess(res.data.accessToken, res.data.user);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
  }

  render() {
    const { formData, isLoading } = this.state;

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

        <AvatarPreviewWrapper>
          <AvatarPreview 
            src={this.state.imageFile}
            onClick={this.onAvatarPreviewClick}
          />
          <FileInput
            name="avatar"
            type="file"
            required
            accept="image/*"
            ref={this.fileInput}
            onChange={this.handleInputChange}
          />
        </AvatarPreviewWrapper>

        <FormGroup>
          <Button
            type="submit"
            disabled={isLoading}
          >
            { isLoading ? 'Signing Up...' : 'Sign Up' }
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default SignUpForm;