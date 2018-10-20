import React from "react";

import { connect } from "react-redux";
import { emptyTravelerBasket } from "../basketActions";

import ListBasketItems from "./ListBasketItems";


class ListClassicBasketItems extends React.Component {
	constructor(props) {
		super(props);
		props.emptyTravelerBasket();
	}

	getCounts = (items) => {
		const counts = {};
		if (items)
			for (let i = 0; i < items.length; i++) {
				let key = items[i].product.id;
				counts[key] = (counts[key] !== undefined && counts[key] !== null ? counts[key] : 0) + items[i].quantity;
			}
		return counts;
	};

	render() {
		const counts = this.getCounts(this.props.basket.items);
		const items = this.props.basket.items
			.filter((item, index, self) =>
				index === self.findIndex((needle) => (
					needle.product.id === item.product.id
				)))
			.map(item => Object.assign({}, item, {
				quantity: counts[item.product.id],
				isSelected: true
			}));
		return (
			<ListBasketItems items={items}/>
		)
	}
}

const mapStateToProps = state => {
	const ids = state.travelDetails.travelers.map(traveler => traveler.id);
	return ({
		basket: {...state.basket, items: state.basket.items.filter(item => ids.includes(item.travelerId) && item.quantity > 0)}
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		emptyTravelerBasket: () => dispatch(emptyTravelerBasket())
	});
};


export default connect(mapStateToProps, mapDispatchToProps)(ListClassicBasketItems);