import React, { Component } from 'react'
import AllCards from './AllCards'
import SelectedCards from './SelectedCards'

const fakeObject = {
	state : {
		chosenCards: ["1", "2", "3", "4", "5"]
	}
}


export default class NewActivityPage extends Component {
	state = {
		chosenCards: ["1", "2", "3", "4", "5"]
	}

	render() {

		//by adding chosenCards as a prop, it gets passed down to the instance of SelectedCards.
		// The "this" refers to the NewActivityPage.

		return (
			<div>
				<SelectedCards chosenCards={fakeObject.state.chosenCards} />
				<AllCards />
			</div>

		)
	}
}
