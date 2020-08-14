import React, { Component } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';

export default class WelcomePage extends Component {
    state = { userName: "", password: "" };

    createNewUser = () => {
        window.location.href = "/CreateAccount";
    }


    handleInputChange = (event) => {
        const newValue = event.target.value;
        const newState = { [event.target.name]: event.target.value };
        this.setState(newState)
    };



    handleSubmitLogin = (event) => {
        event.preventDefault();


        const loginResult = axios({
            method: "post",
            url: "http://localhost:3001/auth/login",
            data: { authorization: `${this.state.userName}`, password: `${this.state.password}` },
            crossDomain: true
        }).then((response) => {
            if (response.status === 200) { this.props.history.push(`/${this.state.userName}/${response.data.token}`) }
        })
    }


    render() {
        return (
            <div className="divWelcome" name='homeDiv'>

                <div className="divAppName green1">shape thyself</div>

                <Form onSubmit={this.handleSubmitLogin}>
                    <Form.Field>
                        <label className="textLeft">Email</label>
                        <input name="userName" onChange={this.handleInputChange} placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label className="textLeft">Password</label>
                        <input name="password" onChange={this.handleInputChange} placeholder='Password' />
                    </Form.Field>
                    <Button type="submit" className="btn1 green">Login</Button>
                </Form>

                <br></br>
                <br></br>

                <br></br>
                <button className="btn1 brick" onClick={this.createNewUser}>Not registered? Sign up!</button>

            </div>
        );
    }
}
