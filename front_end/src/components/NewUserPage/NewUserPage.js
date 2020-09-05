import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

console.log("")
console.log("new user page, after imports.")
console.log("")

export default class NewUserPage extends Component {
  state = {newUserName: "", newPassword: "", confirmedPassword: ""};


  handleInputChange = (event) => {
    const newValue = event.target.value;
    const newState = {[event.target.name]: event.target.value};
    this.setState(newState)};



    handleSubmitCreateAccount =(event) =>
        {event.preventDefault();
        console.log("state: ", this.state);

        const loginResult = axios({
                method: "post",
                // url: "http://localhost:3001/auth/createNewAccount",
                url: "/auth/createNewAccount",

                data: {newUserName: `${this.state.newUserName}`, newPassword: `${this.state.newPassword}`, confirmedPassword: `${this.state.confirmedPassword}`},
                crossDomain: true})

        // window.location.href = "/";
        // this.handleRDSCreateAccount();
        this.props.history.push("/");

        };


    

    // handleRDSCreateAccount =(event) => {
    //     const loginResult = axios({
    //             method: "post",
    //             // url: "http://localhost:3001/auth/createNewAccountRDS",
    //             url: "/auth/createNewAccountRDS",
    //             data: {newUserName: `${this.state.newUserName}`  },
    //             crossDomain: true})

    //     //window.location.href = "/";
    //     this.props.history.push("/");
    //     };
        
        
        


  render() {
    return (
        <div className="divWelcome">

        <div className="divAppName brick">Create account</div>
        <br></br>
        <Form onSubmit={this.handleSubmitCreateAccount}>

            <Form.Field>
                <label className="textLeft">Email</label>
                <input name="newUserName" onChange={this.handleInputChange} placeholder='email'/>
            </Form.Field>

            <Form.Field>
                <label className="textLeft">Password</label>
                <input name="newPassword" onChange={this.handleInputChange} placeholder='Password' />
            </Form.Field>

            <Form.Field>
                <label className="textLeft">Confirm password</label>
                <input name="confirmedPassword" onChange={this.handleInputChange} placeholder='Confirm password' />
            </Form.Field>

            <Button type="submit" className="btn1 brick">Create account</Button>
        </Form>

      </div>
    );
  }
}
