import React, { Component } from "react";
import axios from "axios";

export default class HomePage extends Component {
  state = {
    authStatus: 0,
  };

  componentDidMount = async () => {
    await this.authenticate();
  };

  authenticate = async () => {
    try {
      const authenticationResult = await axios({
        method: "post",
        url: "http://127.0.0.1:3001/auth/tokenAuthenticate",
        data: {
          authorizationName: `${this.props.match.params.user}`,
          token: `${this.props.match.params.sessionId}`,
        },
        crossDomain: true,
      });
      console.log("result", authenticationResult);
      this.setState({ authStatus: authenticationResult.data.status });
    } catch (err) {
      console.log("Err in homepage authentication", JSON.stringify(err));
    }
  };

  // Declare the function to be called when clicking the button.
  // Because we're using "Router", we have access to history, which
  // is an object with multiple methods. It keeps track of the current
  // URL and where you've been (browsing wise).

  startActivity = () => {
    //history is a prop provided by the router, in App.js, render ()
    this.props.history.push(`${this.props.match.url}/NewActivityPage`);
  };

  render() {
    if (this.state.authStatus === 0) {
      return <div>Loading HOME PAGE!</div>;
    } else if (this.state.authStatus == 200) {
      return (
        <div>
          <div>Congrats. Now what? </div>
          <br></br>
          <button onClick={() => this.startActivity()}>New Activity</button>
          <br></br>
          <h4>Previous sessions:</h4>
        </div>
      );
    } else if (this.state.authStatus == 440) {
      return <div>Session Expired! Please re-login</div>;
    } else if (this.state.authStatus == 401) {
      return <div>"Get OUT!"</div>;
    }
  }
}
