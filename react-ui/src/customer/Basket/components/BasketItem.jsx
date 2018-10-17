import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";


const Item = styled.tr`
	box-shadow: 0 2px 2px -2px ${theme.borderColor};
	&:last-child {
		box-shadow: 0 0 0;
	}
`;

const Cell = styled.td`
	padding: 16px 0;
	&:first-child, &:second-child, &:third-child {
		padding-top: 0;
	},
`;

const Price = styled(Cell)`
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