import React from "react";
import styled from "styled-components";
import BasketItem from "./BasketItem";


const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const ListBasketItems = ({ items }) => {
	return (
		<Table>
			<tbody>
			{items.map((item, index) =>
				<BasketItem key={item.product.id+'-'+index} item={item}/>
			)}
			</tbody>
		</Table>
	);
};

export default ListBasketItems;