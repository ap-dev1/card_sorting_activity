import React from 'react'
import ValueBox from './ValueBox'

const FullDeckBox = (props) => {
  const principles = [
    "Power",
    "Compassion",
    "Money"
  ]

  const principleBoxes = principles.map((principle)=>{
    return <ValueBox value={principle}/>
  })


    return (
      <div>
        {principleBoxes}
      </div>
    )
}

export default FullDeckBox