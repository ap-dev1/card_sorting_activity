import React, { useState, Component } from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

export default class AllCards extends Component {

  state = { principles: [] }

  
  testRequestAxios = async () => {
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/resources/defaultCards",
      crossDomain: true
    })
    const destructuredResponse = Object.entries(axiosResponse.data);

    this.setState({ principles: destructuredResponse })
  }


  componentDidMount = async () => {
    await this.testRequestAxios()
  }




  render() {


    const principleBoxes = this.state.principles.map((principle) => {
      return (
        <CardTemplate value={principle[1]} cardSelector={this.props.cardsSelector} id={principle[0]}/>
      )
    })


    return (
      <div>
        {principleBoxes}
      </div>
    )
  }
}