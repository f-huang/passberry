import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import EnumToggleItems from "../EnumItemsLayout";


const Total = styled.p``;

class BasketTotal extends React.Component {
	constructor(props) {
		super(props);
	}

	getTotal = () => {
		const ids = Object.keys(this.props.travelersBasket).filter(id =>
			this.props.travelersBasket[id] === true);
		const items = this.props.itemsLayout === EnumToggleItems.CLASSIC.value ?
			this.props.basket.items :
			this.props.basket.items.filter(item =>
				ids.find(id => parseInt(item.travelerId, 10) === parseInt(id, 10)));
		const quantities = items.map(item => item.quantity);
		const prices = items.map(item => item.product.price.adult);
		return prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0;
	};

	render() {
		return (
			<Total> { this.getTotal() } </Total>
		);
	}
}

const mapStateToProps = state => {
	return ({
		basket: state.basket,
		travelersBasket: state.basketPage.travelers,
		itemsLayout: state.basketPage.itemsLayout
	});
};


export default connect(mapStateToProps)(BasketTotal);