import React, { useState } from 'react';
import styled from 'styled-components';


const StyleSelectedCard = styled.div`
    border: 1px solid navy;
    background-color: #D5F5E3;
    height: 75px;
    text-align: center;
    vertical-align: center;
    padding: 20px;
`

const StyleContainerSelected = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    background-color: #ffffff;
    border: 2px solid orange;
    margin-bottom: 15px;
    margin-left:100px;
    margin-right: 100px;
`


const SelectedCards = (props) => {
    const cardsMap = props.chosenCards.map((id) => {

        return (
            <StyleSelectedCard>
                {id}
            </StyleSelectedCard>)
    })


    return (
        <StyleContainerSelected>
            {cardsMap}
        </StyleContainerSelected>
    )
}

export default SelectedCards;