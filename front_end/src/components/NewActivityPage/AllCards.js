import React, { useState } from 'react';
import CardTemplate from './CardTemplate';
import axios from 'axios';

const AllCards = (props) => {

  const [principles, setPrinciples] = useState([])

  const testRequestAxios = async () => {
    const axiosResponse = await axios({
      method: "post",
      url: "http://127.0.0.1:3001/resources/defaultCards",
      crossDomain: true
    })

    const destructuredResponse = Object.entries(axiosResponse.data);
    setPrinciples(destructuredResponse)
    //console.log("principles:", principles);
    //console.log("Axios Response: ", axiosResponse)
  }

  testRequestAxios();


  const principleBoxes = principles.map((principle) => {
    return <CardTemplate value={principle[1]} />
  })

  return (
    <div>
      {principleBoxes}
    </div>
  )
}

export default AllCards