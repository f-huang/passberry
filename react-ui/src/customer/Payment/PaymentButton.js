import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import { emptyBasket } from "../Basket/basketActions";
import { VALIDATE_BASKET, CREATE_PASS } from "../../queries";

import Button from "../../component/Button/Button";
import EnumToggleItems from "../Basket/EnumItemsLayout";

class PaymentButton extends React.Component {

	constructor(props) {
		super(props);
		this.executeMutations = this.executeMutations.bind(this);
		this.executeMutateBasket = this.executeMutateBasket.bind(this);
		this.executeMutatePass = this.executeMutatePass.bind(this);
	}

	executeMutateBasket = () => {
		this.props.validateBasket({
			variables: {
				input: {
					basketId: this.props.basket.id,
					userId: 1,
					state: 'SUCCESS'
				}
			}
		}).then((data) => {
			console.log("basket: ", data);
			this.props.onMutateSuccess();
			this.props.history.push('/');
		})

	};

	executeMutatePass = () => {
		const travelersIds = [...new Set(this.props.basket.items.map(item => item.travelerId))];
		travelersIds.forEach(travelerId => {
			const tickets = [];
			const travelerItems = this.props.basket.items.filter(item => item.travelerId === travelerId && item.quantity > 0)
			travelerItems.forEach(travelerItem => tickets.push({
				attractionId: travelerItem.product.id,
				quantity: travelerItem.quantity
			}));
			this.props.createPass({
				variables: {
					input: {
						basketId: this.props.basket.id,
						startDate: this.props.startDate,
						endDate: this.props.endDate,
						pass: {
							userId: 1,
							travelerId: travelerId,
							tickets: tickets
						}
					}
				}
			}).then((data) => {
				console.log("pass: ", data);
			})
		});
	};

	executeMutations = () => {
		this.executeMutatePass();
		this.executeMutateBasket();
	};

	render() {
		return (
			<Button value={`Payer €${this.props.total}`}
			        onClick={this.executeMutations}/>
		)
	}
}

const mapStateToProps = state => {
	const ids = state.basketPage.travelers ? Object.keys(state.basketPage.travelers).filter(id =>
		state.basketPage.travelers[id] === true
	) : null;
	console.log(ids);
	const items = !ids || ids.length === 0 ?
		state.basket.items :
		state.basket.items.filter(item =>
			ids.find(id => parseInt(item.travelerId, 10) === parseInt(id, 10))
		);
	console.log(items);
	const quantities = items.map(item => item.quantity);
	const prices = items.map(item => item.product.price.adult);

	return ({
		total: prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0,
		startDate: state.travelDetails.travelDates.startDate.format("YYYY-MM-DD hh:mm:ss"),
		endDate: state.travelDetails.travelDates.endDate.format("YYYY-MM-DD hh:mm:ss"),
		basket: state.basket
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onMutateSuccess: () => { dispatch(emptyBasket()) }
	})
};

const withOptions = compose(
	graphql(VALIDATE_BASKET, { name: 'validateBasket'}),
	graphql(CREATE_PASS, { name: 'createPass'}),
	connect(mapStateToProps, mapDispatchToProps)
);

export default withRouter(withOptions(PaymentButton));