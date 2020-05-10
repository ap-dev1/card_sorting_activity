import React, { Component } from 'react'
import ValueBox from './ValueBox'
import FullDeck from './FullDeck'
import ChosenCards from './ChosenCards'


export default class NewActivityPage extends Component {
  render() {
    return (
      <div>
        <FullDeck/>
        <ChosenCards/>
      </div>
    )
  }
}
