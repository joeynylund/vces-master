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

  const [success, setSuccess] = useState(false)

  const [emailValidation, setEmailValidation] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState(false)

  async function formSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    await fetch('https://nylund.dev/streamer/public/streamer/items/users?filter[email][eq]=' + email + '&access_token=VU73mX5crdWJYSOcwYxC5oE9')
    .then(response => response.json())
    .then(data => {
      if(data.data.length >= 1) {
        setEmailValidation(false)
        setPasswordValidation(false)
        const hash = data.data[0].password;
        fetch('https://nylund.dev/streamer/public/streamer/utils/hash/match', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({hash: hash, string: password})
        }).then(response => response.json())
        .then(data => {
          if(data.data.valid === true){
            setSuccess(true)
          } else {
            setPasswordValidation(true)
          }
        })
      } else {
        setEmailValidation(true)
      }
    })
  }

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
      {success === true ? <h1>You're in!</h1> : <Form style={{width:'500px'}} onSubmit={formSubmit}>
        <FormGroup>
          <Label for="email" style={{width:'100%',textAlign:'left'}}>Email</Label>
          <Input type="email" name="email" id="email" invalid={emailValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>Looks like we don't have that email registered.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password" style={{width:'100%',textAlign:'left'}}>Password</Label>
          <Input type="password" name="password" id="password" invalid={passwordValidation} />
          <FormFeedback style={{width:'100%',textAlign:'left'}}>Looks like that password didn't work.</FormFeedback>
        </FormGroup>
        <Button style={{float:'left'}}>Login</Button>
      </Form>}
    </div>
      
    </div>
  );
}

export default App;
