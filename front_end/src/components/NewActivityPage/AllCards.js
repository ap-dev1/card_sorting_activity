import React, { useState, Component } from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

export default class AllCards extends Component {

  state = { principles: [], hiddenPrinciples: []}

  testRequestAxios = async () => {
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/resources/defaultCards",
      crossDomain: true
    })

    const destructuredResponse = Object.entries(axiosResponse.data);

    this.setState({ 
        principles: destructuredResponse, 
        hiddenPrinciples: destructuredResponse }) 
    };


  componentDidMount = async () => {await this.testRequestAxios()  };


  hideThisCard = (cardText) => {
    const hiddenPrinciples = this.state.hiddenPrinciples;
    const hidddenCard = hiddenPrinciples.find(x => x[0] === cardText);
    const indexHiddenCard = hiddenPrinciples.indexOf(hidddenCard)
    hiddenPrinciples.splice(indexHiddenCard, 1);

    this.setState({ hiddenPrinciples: hiddenPrinciples })
    
};
  
  render() {

    

    const principleBoxes = this.state.hiddenPrinciples.map((principle) => {
      return (
        <CardTemplate 
            value={principle[1]} 
            cardSelector={this.props.cardsSelector} 
            id={principle[0]}
            cardRemover={this.hideThisCard}
            />
      )
    })


    return (
      <div>
        {principleBoxes}
      </div>
    )
  }
}