import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import EnumToggleItems from "../EnumItemsLayout";
import theme from "../../../app/theme";

const Root = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const TotalRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bolder;
	font-size: 16px;
`;

const Line = styled.div`
	height: 1px;
	margin: 16px 0;
	border-top: 1px solid ${theme.borderColor};
`;

const BasketRecap = ({discounts, subTotal, total}) => {
	return (
		<Root>
			<Line/>
			<TotalRow>
				<div>{ "Total" }</div>
				<div>{ total }{"€"}</div>
			</TotalRow>
		</Root>
	);
};

const mapStateToProps = state => {
	const ids = state.basketPage.travelers ?
		Object.keys(state.basketPage.travelers).filter(id =>
			state.basketPage.travelers[id] === true
		) : null;
	const items = state.basketPage.itemsLayout === EnumToggleItems.CLASSIC.value ?
		state.basket.items :
		state.basket.items.filter(item =>
			ids.find(id => parseInt(item.travelerId, 10) === parseInt(id, 10))
		);
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		total: prices.length === 0 ? 0 :
			prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2)
	});
};

export default connect(mapStateToProps)(BasketRecap);