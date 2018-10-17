import React from "react";
import styled from "styled-components";


const Item = styled.tr`
	
`;

const Cell = styled.td`
	
`;

const Price = styled.td`
	text-align: end;
`;


const BasketItem = ({item}) => {
	return (
		<Item>
			<Cell>{item.quantity}</Cell>
			<Cell>{item.product.name}</Cell>
			<Price>{item.product.price.adult.toFixed(2)}{"€"}</Price>
		</Item>
	);
};

export default BasketItem;