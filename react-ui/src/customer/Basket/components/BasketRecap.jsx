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
	subTotal: PropTypes.string.isRequired,
	discounts: PropTypes.shape({
		name: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		type: PropTypes.shape({
			value: PropTypes.string.isRequired
		}),
	})
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
	const ids = state.basketPage.travelers && Object.keys(state.basketPage.travelers).length > 0 ?
		Object.keys(state.basketPage.travelers).filter(id =>
			state.basketPage.travelers[id] === true &&
			state.travelDetails.travelers.find(traveler => traveler.id.toString() === id.toString())
		) : state.travelDetails.travelers.map(traveler => traveler.id.toString());
	const items = state.basket.items.filter(item =>
		ids.includes(item.travelerId.toString()) && item.quantity > 0
	);
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		subTotal: prices.length === 0 ? "0.00" :
			prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2)
	});
};

export default connect(mapStateToProps)(BasketRecap);