import React, { Component } from 'react'
import AllCards from './AllCards'
import SelectedCards from './SelectedCards'
import axios from 'axios';

// const fakeObject = {
// 	state : {
// 		chosenCards: ["1", "2", "3", "4", "5"]
// 	}
// }

export default class NewActivityPage extends Component {
	state = {
		userChoices: ["1", "2", "3", "4", "5"]
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

		const axiosResponse = await axios({
			method: "post",
			url: "http://127.0.0.1:3001/usersData/SaveSingleSession",
			data: {sessionData: this.state.userChoices, userEmail: this.props.match.params.user, timestamp: new Date().getTime()},
			crossDomain: true
		})

		console.log("RESPONSE: ", axiosResponse)
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
