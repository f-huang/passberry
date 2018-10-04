import React from "react";
import styled from "styled-components";


const Item = styled.tr`
	
`;

const Cell = styled.td`
	
`;


const BasketItem = ({item}) => {
	return (
		<Item>
			<Cell>{item.quantity}</Cell>
			<Cell>{item.product.name}</Cell>
			<Cell>{item.product.price.adult}</Cell>
		</Item>
	);
};

export default BasketItem;