import React, { Component } from "react";
import axios from "axios";
import SessionTemplate from './SessionTemplate';
import { Sticky, Button, Divider } from 'semantic-ui-react'


export default class HomePage extends Component {
    state = {
        authStatus: 0,
        previousSessionsData: []
    };

    componentDidMount = async () => {
        await this.authenticate();
        await this.requestPreviousSessions();
    };


    authenticate = async () => {
        try {
            const authenticationResult = await axios({
                method: "post",
                //url: "http://localhost:3001/auth/tokenAuthenticate",
                url: "/auth/tokenAuthenticate",
                data: {
                    authorizationName: `${this.props.match.params.user}`,
                    token: `${this.props.match.params.sessionId}`,
                },
                crossDomain: true,
            });

            console.log("authentication result", authenticationResult);

            this.setState({ authStatus: authenticationResult.data.status });
        } catch (err) {
            console.log("Err in homepage authentication", JSON.stringify(err));
        }
    };


    requestPreviousSessions = async () => {
        const axiosResponse = await axios({
            method: "post",
            // url: "http://localhost:3001/usersData//PreviousSessionsRouter",
            url: "/usersData//PreviousSessionsRouter",
            data: { email: `${this.props.match.params.user}` },
            crossDomain: true
        })

        const destructuredResponse = axiosResponse.data;

        this.setState({ previousSessionsData: destructuredResponse })
    }


    // Declare the function to be called when clicking the button.
    // Because we're using "Router", we have access to history, which
    // is an object with multiple methods. It keeps track of the current
    // URL and where you've been (browsing wise).

    //   startActivity = () => {
    //     //history is a prop provided by the router, in App.js, render ()
    //     this.props.history.push(`${this.props.match.url}/NewActivityPage`);
    //   };

    startActivity = () => {
        this.props.history.push({
            pathname: `${this.props.match.url}/NewActivityPage`,
            state: [{ myData: this.state.previousSessionsData }]
        });
    };


    render() {

        // sort by timestamp, most recent first:
        this.state.previousSessionsData.sort((a, b) => (b.timestamp - a.timestamp))

        const previousSessionsBoxes = this.state.previousSessionsData.map((item) => {
            const rawDate = new Date(item.timestamp);
            const myDate = rawDate.getMonth() + 1 + '-' + rawDate.getDate() + '-' + rawDate.getFullYear();

            // console.log("timestamp: ", rawDate)
            // console.log("date: ", myDate)

            return (
                <SessionTemplate
                    timestamp={myDate}
                    cards={item.cards} />
            )
        })


        if (this.state.authStatus === 0) {
            return <div>Loading HOME PAGE!</div>;


        } else if (this.state.authStatus == 200) {
            return (
                <div className="divHomePage">

                    <div className="divSignedInWith">{`Signed in with \n${this.props.match.params.user}`}</div>

                    <button className="btnNewActivity green" onClick={() => this.startActivity()}>New Activity</button>

                    <Divider></Divider>

                    {previousSessionsBoxes}
                </div>
            );

        } else if (this.state.authStatus == 440) {
            return <div>Session Expired! Please re-login</div>;

        } else if (this.state.authStatus == 401) {
            return <div>"Get OUT!"</div>;
        }
    }
}