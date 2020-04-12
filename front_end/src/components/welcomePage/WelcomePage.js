import React, { Component } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class WelcomePage extends Component {
  state = {
    userName: "",
    password: "",
  };

  handleInputChange = (event) => {
    const newValue = event.target.value;
    console.log(event.target.name);
    const newState = {
      [event.target.name]: event.target.value,
    };

    this.setState(newState);
  };

  handleSubmitLogin =(event) =>{
    event.preventDefault();
    const loginResult = axios(
      {
          method: "get",
          url: "http://127.0.0.1:3001/auth",
          headers: {
              authorization: `${this.state.userName}`,
              password: `${this.state.password}`,
              "content-type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": true
          },
          crossDomain: true,

      }
  ).then((response)=>{
      console.log('Login Result', response)
  })
  }

  render() {
    return (
      <div>
        <div>
          VALUES SORT CARD APP
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        <Form onSubmit={this.handleSubmitLogin}>
          <Form.Field>
            <label>User Name</label>
            <input name="userName" onChange={this.handleInputChange} placeholder='User Name'/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" onChange={this.handleInputChange} placeholder='Password' />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
