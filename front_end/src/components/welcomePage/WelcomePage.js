import React, { Component } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class WelcomePage extends Component {
  state = {userName: "", password: ""};


  handleInputChange = (event) => {
    const newValue = event.target.value;
    const newState = {[event.target.name]: event.target.value};
    this.setState(newState)};



  handleSubmitLogin =(event) =>
    {event.preventDefault();


    const loginResult = axios({
            method: "post",
            url: "http://127.0.0.1:3001/auth/login",
            data: {authorization: `${this.state.userName}`, password: `${this.state.password}`},
            crossDomain: true}).then((response)=>
            
              {if(response.status === 200)
                {this.props.history.push(`/${this.state.userName}/${response.data.token}`)}})}


  render() {
    return (
      <div className="divWelcome">

        <div className="divWelcome">VALUES SORT CARD APP</div>

        <Form onSubmit={this.handleSubmitLogin}>
          <Form.Field>
            <label className="textLeft">User Name</label>
            <input name="userName" onChange={this.handleInputChange} placeholder='User Name'/>
          </Form.Field>
          <Form.Field>
            <label className="textLeft">Password</label>
            <input name="password" onChange={this.handleInputChange} placeholder='Password' />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
