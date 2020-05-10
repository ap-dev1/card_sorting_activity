import React, { Component } from 'react';
import ValueBox from './ValueBox';
import values from "../../data/values.js";

const FullDeck = () => {
  const cardsArray = values.map( (user, i) => {
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
          {cardsArray};
      </div>
  );
}

export default FullDeck;