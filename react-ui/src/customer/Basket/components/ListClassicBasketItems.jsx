import React from "react";
import { connect } from "react-redux";
import { emptyTravelerBasket } from "../basketActions";
import BasketItem from "./BasketItem";

class ListClassicBasketItems extends React.Component {
	constructor(props) {
		super(props);
		props.emptyTravelerBasket();
	}

	getCounts = (items) => {
		const counts = {};
		if (items)
			for (let i = 0; i < items.length; i++) {
				let num = items[i].product.id;
				counts[num] = (counts[num] || 0) + 1;
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
			<table>
				<tbody>
				{
					items.map((item, index) => (
						<BasketItem  key={`classic${item.product.id}-${index}`} item={item}/>
					))
				}
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = state => {
	return ({
		basket: state.basket,
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		emptyTravelerBasket: () => dispatch(emptyTravelerBasket())
	});
};


export default connect(mapStateToProps, mapDispatchToProps)(ListClassicBasketItems);