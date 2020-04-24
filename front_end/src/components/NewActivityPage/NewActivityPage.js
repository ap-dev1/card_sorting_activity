import React, { Component } from 'react'
import ValueBox from './ValueBox'
import FullDeckBox from './FullDeckBox'
import ChosenCardsBox from './ChosenCardsBox'

export default class NewActivityPage extends Component {
  render() {
    return (
      <div>
        <FullDeckBox/>
        <ChosenCardsBox/>
      </div>
    )
  }
}
