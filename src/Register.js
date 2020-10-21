import React, { useState, useRef } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Row,
  Container,
  Col,Button, Form, FormGroup, Label, Input, FormText, FormFeedback
} from 'reactstrap';
import logo from './V_spade_2.png';
import './App.css';
import Spinner from 'react-spinkit';

function App() {

  const [success, setSuccess] = useState(false);

  const [firstNameValidation, setFirstNameValidation] = useState(false);

  const [lastNameValidation, setLastNameValidation] = useState(false);

  const [emailValidation, setEmailValidation] = useState(false);

  const [emailText, setEmailText] = useState('')

  const [passwordValidation, setPasswordValidation] = useState(false)

  async function formSubmit(e) {
    e.preventDefault()
    setFirstNameValidation(false)
    setLastNameValidation(false)
    setEmailValidation(false)
    setPasswordValidation(false)
    const data = new FormData(e.target);
    const first_name = data.get('first_name');
    const last_name = data.get('last_name');
    const email = data.get('email');
    const password = data.get('password');
    if(first_name.length === 0) {
      setFirstNameValidation(true)
    } else {
      if(last_name.length === 0) {
        setLastNameValidation(true)
      } else {
        if(email.length === 0) {
          setEmailText('Email is required');
          setEmailValidation(true)
        } else {
          fetch('https://nylund.dev/streamer/public/streamer/items/users?filter[email][eq]=' + email + '&access_token=VU73mX5crdWJYSOcwYxC5oE9')
          .then(response => response.json())
          .then(data => {
          if(data.data.length >= 1) {
            setEmailText('This email is already registered');
            setEmailValidation(true)
          } else {
          if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            if(password.length <= 7) {
              setPasswordValidation(true)
            } else {
              fetch('https://nylund.dev/streamer/public/streamer/items/users?access_token=VU73mX5crdWJYSOcwYxC5oE9', {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({first_name: first_name, last_name: last_name, email: email, password: password})
              }).then(response => response.json())
              .then(data => {
                setSuccess(true)
            })
            }
          } else {
            setEmailText('Enter a valid email address.')
            setEmailValidation(true)
          }
        }
      }
    )}
    }}}

  const NavBar2 = () => {

    return (
      <div>

        <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} width="75px" /></NavbarBrand>
        </Navbar>
      </div>
    );
  }

  return (
    
    <div className="App" id="App">
      <NavBar2 />

    <div className="App-header">
      {success === true ? <h1>You're signed up!</h1> : <Form style={{width:'500px'}} onSubmit={formSubmit}>
        <FormGroup>
          <Label for="first_name" style={{width:'100%',textAlign:'left'}}>First Name</Label>
          <Input type="text" name="first_name" id="first_name" invalid={firstNameValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>First Name is required.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="last_name" style={{width:'100%',textAlign:'left'}}>Last Name</Label>
          <Input type="text" name="last_name" id="last_name" invalid={lastNameValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>Last Name is required.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email" style={{width:'100%',textAlign:'left'}}>Email</Label>
          <Input type="email" name="email" id="email" invalid={emailValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>{emailText}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password" style={{width:'100%',textAlign:'left'}}>Password</Label>
          <Input type="password" name="password" id="password" placeholder="Must be at least 8 characters." invalid={passwordValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>Password must be 8 characters.</FormFeedback>
        </FormGroup>
        <Button style={{float:'left'}}>Register</Button>
      </Form>}
    </div>
      
    </div>
  );
}

export default App;
