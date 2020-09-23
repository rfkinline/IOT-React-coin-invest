import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 14vw;
`;
const TdName = styled(Td)`
    width: 20vw;
`;

export default function Coin(props) {
    

return (
    <tr>
        <TdName>{props.name}</TdName>
        <Td>{props.ticker}</Td>
        <Td>${parseFloat(Number(props.price.toFixed(2)))}</Td>
        <Td>{props.rank}</Td>
        <Td>{props.showBalance ? props.balance : '-' } </Td>
    </tr>
);
    }

Coin.propTypes = {
    name: PropTypes.string.isRequired, 
    ticker: PropTypes.string,
    price: PropTypes.number

}