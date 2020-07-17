import React, { useState } from 'react';
import styled from 'styled-components';


const StyleSelectedCard = styled.div`
    border: 2px solid #10bc98;
    background-color: #D5F5E3;
    height: 75px;
    text-align: center;
    vertical-align: center;
    padding: 20px;
    width: 100%;
    color: #0e6c58;
    font-size: 1.5rem;
    font-weight: 700;
`


const StyleSelectedContainer = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    background-color: #ffffff;
    width: 100%;
    margin-bottom: 20px;
`


const SelectedCards = (props) => {
    const cardsMap = props.chosenCards.map((id) => {

        return (
            <StyleSelectedCard>
                {id}
            </StyleSelectedCard>)
    })


    return (
        <StyleSelectedContainer>
            {cardsMap}
        </StyleSelectedContainer>
    )
}

export default SelectedCards;