import React, { useState, Component } from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

export default class AllCards extends Component {

  state = { allPrinciples: [], visiblePrinciples: []}

  testRequestAxios = async () => {
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/resources/defaultCards",
      crossDomain: true
    })

    const destructuredResponse = Object.entries(axiosResponse.data);

    this.setState({ 
        allPrinciples: [...destructuredResponse], 
        visiblePrinciples: [...destructuredResponse] }) 
    };


  componentDidMount = async () => {await this.testRequestAxios()  };


  hideThisCard = (cardText) => {
    const visiblePrinciples = this.state.visiblePrinciples;
    const hidddenCard = visiblePrinciples.find(x => x[0] === cardText);
    const indexHiddenCard = visiblePrinciples.indexOf(hidddenCard)
    visiblePrinciples.splice(indexHiddenCard, 1);

    this.setState({ visiblePrinciples: visiblePrinciples })
    
};

    bringBackHiddenCards = () => {
        const allPrinciples = [...this.state.allPrinciples];
        this.setState({visiblePrinciples: allPrinciples})
    }


  render() {

    console.log("AllCards, props: ", this.props)

    const principleBoxes = this.state.visiblePrinciples.map((principle) => {
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
            <button onClick={this.bringBackHiddenCards} className="alignRight">unhide all ({this.state.visiblePrinciples.length}, {this.state.allPrinciples.length}) </button>
            <div style={{ overflowX: "scroll", height: "80vh" }}>        
            {principleBoxes}
            </div>
        </div>
    )
  }
}