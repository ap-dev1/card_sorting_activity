import React, { Component } from 'react'
import AllCards from './AllCards'
import SelectedCards from './SelectedCards'
import axios from 'axios';


export default class NewActivityPage extends Component {
	state = {
        userChoices: ["1", "2", "3", "4", "5"],
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

		return (
			<div>
				<SelectedCards chosenCards={this.state.userChoices} />
				<button onClick={() => this.saveSession()}>Save session</button>
				<AllCards cardsSelector={this.chooseCards} />

			</div>

		)
	}
}
