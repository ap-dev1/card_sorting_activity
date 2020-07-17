import React, { Component , createRef} from 'react'
import AllCards from './AllCards'
import SelectedCards from './SelectedCards'
import axios from 'axios';
// import { Image, Input, Menu, Segment, Sticky } from 'semantic-ui-react'
import {Sticky, Button } from 'semantic-ui-react'


export default class NewActivityPage extends Component {
	state = {
        userChoices: ["?", "?", "?", "?", "?"],
        userExclusions: []
	}

    
	//method! we need something changed in one page but the button to change it
	// belongs to a different component, which is lower in tree, and props
	// cannot be passed up. 


	// method inside of class:
	chooseCards = (cardText) => {

        const newUserChoices = this.state.userChoices
		newUserChoices.unshift(cardText)
        newUserChoices.pop()
        
		this.setState({
            userChoices: newUserChoices
        })

        if (newUserChoices.includes("?")) {
            
            console.log("yes!")
          } else {
            alert("five values. Submit?") 
          }
	}


	hideCards = (cardText) => {

        const newHiddenCards = this.state.userExclusions
        
		newHiddenCards.unshift(cardText)
        newHiddenCards.pop()
        
		this.setState({
            userExclusions: newHiddenCards
        })

        console.log("yes!")
	}




	saveSession = async () => {

        // previousSessions was pushed from Home page: 
        const previousSessions = this.props.location.state[0].myData;
        
        // turn the array into a string:
        var newCards = '';
        this.state.userChoices.forEach(item => {
            newCards = newCards + item + "\n"
        })

        // Create the newSession object and append it to the array of existing sessions:
        const newSession = {cards: newCards, timestamp: new Date().getTime()}
        previousSessions.push(newSession)
        
        // request a post:
		const axiosResponse = await axios({
			method: "post",
			url: "http://127.0.0.1:3001/usersData/UpdatedSessions",
			data: {sessionData: previousSessions, userEmail: this.props.match.params.user},
			crossDomain: true
        })
        
        console.log("RESPONSE: ", axiosResponse)
        
        // return to home page:
        window.location.href=`/${this.props.match.params.user}/${this.props.match.params.sessionId}`
	}



	render() {

		//by adding chosenCards as a prop, it gets passed down to the instance of SelectedCards.
        // The "this" refers to the NewActivityPage.
        
        //const fullDeck = this.AllCards.state;
        //console.log("fullDeck: ", fullDeck)

		return (
			<div ref={this.contextRef}>

                <Sticky context={this.contextRef}>
                    <SelectedCards chosenCards={this.state.userChoices} attached='top' />

{/* 
                    semantic components, buttons, property of being disabled based on a variable value or something. */}
                    <button className="btn1 green" onClick={() => this.saveSession()}>Save session</button>

                </Sticky>

                <div attached='bottom'>
    				<AllCards cardsSelector={this.chooseCards} />
                </div>



			</div>

		)
	}
}
