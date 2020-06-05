import React, { Component } from 'react'
import AllCards from './AllCards'
import SelectedCards from './SelectedCards'


export default class NewActivityPage extends Component {

	state = {
		chosenCards: [];
		
	}

  	render() {

    	return (
	      	<div>
	       		<AllCards/>
	        	<SelectedCards/>
	      	</div>

    )
  }
}
