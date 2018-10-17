import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EnumToggleItems from "../EnumItemsLayout";
import theme from "../../../app/theme";
import EnumDiscountType from "../../EnumDiscountType";

const Root = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 48px;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 13px;
`;

const TotalRow = styled(Row)`
	font-weight: bolder;
	font-size: 16px;
`;
const Line = styled.div`
	height: 1px;
	margin: 16px 0;
	border-top: 1px solid ${theme.borderColor};
`;

const propTypes = {
	subTotal: PropTypes.number.isRequired,
	discounts: {
		name: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		type: PropTypes.shape({
			value: PropTypes.string.isRequired
		}),
	}
};

const BasketRecap = ({discounts = [], subTotal}) => {
	const total = discounts.reduce((sum, current) =>
			current.type === EnumDiscountType.RAW ? sum - current.value : sum * (1 - current.percent / 100)
		, subTotal);
	return (
		<Root>
			<Row>
				<div>{ "Sous total" }</div>
				<div>{ subTotal }{"€"}</div>
			</Row>
			{ discounts.map(discount =>
				<Row>
					<div>{ discount.name }</div>
					<div>{ discount.type === EnumDiscountType.RAW ?
						discount.value : subTotal * discount.value / 100}{"€"}
					</div>
				</Row>
			)}
			<Line/>
			<TotalRow>
				<div>{ "Total" }</div>
				<div>{ total }{"€"}</div>
			</TotalRow>
		</Root>
	);
};


BasketRecap.propTypes = propTypes;

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
		subTotal: prices.length === 0 ? 0 :
			prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2)
	});
};

export default connect(mapStateToProps)(BasketRecap);