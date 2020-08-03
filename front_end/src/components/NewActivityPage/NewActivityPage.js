import React, { Component, createRef } from "react";
import AllCards from "./AllCards";
import SelectedCards from "./SelectedCards";
import axios from "axios";
import { Sticky, Button } from "semantic-ui-react";
import styled, {css} from 'styled-components';



export default class NewActivityPage extends Component {
  state = {
    userChoices: ["?", "?", "?", "?", "?"],
    userExclusions: [],
    btnSaveDisabled: true
  };

  //method! we need something changed in one page but the button to change it
  // belongs to a different component, which is lower in tree, and props
  // cannot be passed up.


    // Added functionality to prevent duplicates and submissions 
    // with empty slots, denoted by question mark - ?.
	chooseCards = (cardText) => {

        const newUserChoices = this.state.userChoices

        console.log("cardText: ", cardText)

        if (this.state.userChoices.includes(cardText)) {
            alert(cardText + " is already in the list.")

        } else {
            newUserChoices.unshift(cardText)
            newUserChoices.pop()
            
            this.setState({
                userChoices: newUserChoices
            })
        }

        if (this.state.userChoices.includes("?")) {
            this.setState({btnSaveDisabled: true})
        } else {
            this.setState({btnSaveDisabled: false})
        }
	};



  saveSession = async () => {
    // previousSessions was pushed from Home page:
    const previousSessions = this.props.location.state[0].myData;


    
    // turn the array into a string:
    var newCards = "";
    this.state.userChoices.forEach((item) => {
      newCards = newCards + item + "\n";
    });

    // Create the newSession object and append it to the array of existing sessions:
    const newSession = { cards: newCards, timestamp: new Date().getTime() };

    previousSessions.push(newSession);

    // request a post:
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/usersData/UpdatedSessions",
      data: {
        sessionData: previousSessions,
        userEmail: this.props.match.params.user,
      },
      crossDomain: true,
    });

    console.log("RESPONSE: ", axiosResponse);

    // return to home page:
    window.location.href = `/${this.props.match.params.user}/${this.props.match.params.sessionId}`;

    await this.saveSessionRDS();  // without await it returns a promise and does not wait for the response;
  };




  saveSessionRDS = async () => {
   
    // request a post:
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/usersData/SaveSession",
      data: {
        sessionContent: this.state.userChoices,
        userEmail: this.props.match.params.user,
        timestamp:  new Date().getTime()
      },
      crossDomain: true,
    });


    // return to home page:
    window.location.href = `/${this.props.match.params.user}/${this.props.match.params.sessionId}`;


    
  };









  render() {
    //by adding chosenCards as a prop, it gets passed down to the instance of SelectedCards.
    // The "this" refers to the NewActivityPage.

    //const fullDeck = this.AllCards.state;
    //console.log("fullDeck: ", fullDeck)

    return (
      <div>
        <div>

        <div className="divSignedInWith">{`Signed in with \n${this.props.match.params.user}`}</div>

          <SelectedCards chosenCards={this.state.userChoices} attached="top" />

          {/*
                    semantic components, buttons, property of being disabled based on a variable value or something. */}
          <button disabled={this.state.btnSaveDisabled} className="btn1 green"  onClick={() => this.saveSession()}>
            Save session
          </button>
        </div>

        <div  attached="bottom">
          <AllCards
            className="test"
            cardsSelector={this.chooseCards}
          />
        </div>
      </div>
    );
  }

};