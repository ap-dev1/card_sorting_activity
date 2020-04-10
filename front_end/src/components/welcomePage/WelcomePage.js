import React, { Component } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'

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

  handleSubmitLogin(event) {
    event.preventDefault();
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
            <label>First Name</label>
            <input name="userName" onChange={this.handleInputChange} placeholder='User Name'/>
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input name="password" onChange={this.handleInputChange} placeholder='Password' />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
