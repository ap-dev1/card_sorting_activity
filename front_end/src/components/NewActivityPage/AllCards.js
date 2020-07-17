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

    this.setState({ principles: destructuredResponse, hiddenPrinciples: destructuredResponse })
  }


  componentDidMount = async () => {
    await this.testRequestAxios()  
  }


  hideThisCard = (cardText) => {
    console.log("")
    console.log("card text:" , cardText)
    console.log("")

    const hiddenPrinciples = this.state.hiddenPrinciples;

    console.log(hiddenPrinciples.length, " items in hiddenPrinciples.")
    console.log("item[0]: ", hiddenPrinciples[0] )
    console.log("item[0][0]: ", hiddenPrinciples[0][0] )
    console.log("")

    const hidddenCard = hiddenPrinciples.find(x => x[0] === cardText)
    
    console.log("hiden card is: ", hidddenCard)
    console.log("")
    console.log(hiddenPrinciples.length, " items in hiddenPrinciples.")
    console.log("")

    // delete hiddenPrinciples(hidddenCard)
    // myArray.find(x => x.id === '45').foo;


    const indexHiddenCard = hiddenPrinciples.indexOf(hidddenCard)
    console.log("index is: ", indexHiddenCard)
    console.log("")
    

    hiddenPrinciples.splice(indexHiddenCard, 1);

    console.log("length after:", hiddenPrinciples.length)
    console.log("---------------------------------------")
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