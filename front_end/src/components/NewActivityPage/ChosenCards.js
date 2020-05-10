import React, { Component } from 'react'
import styled from 'styled-components'
import values from "../../data/values.js"
import ValueBox from './ValueBox.js'

const ChosenCards = () => {
    const chosenArray = values.map((user, i) => {
        return (
            <ValueBox
                key={i}
                id={values[i].id} 
                name={values[i].name} 
                description={values[i].description}
                />
      );
  })
  
      return (
          <div>
              {chosenArray};
          </div>
      );
    }

    export default ChosenCards;