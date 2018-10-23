import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import {emptyBasket, reinitializeBasket, updateTravelerIds} from "../Basket/basketActions";
import {VALIDATE_BASKET, CREATE_PASS, CREATE_TRAVELER} from "../../queries";

import Button from "../../component/Button/Button";
import EnumBasketState from "../Basket/EnumBasketState";
import {editTraveler} from "../Travel/travelActions";

class PaymentButton extends React.Component {

	constructor(props) {
		super(props);
		this.executeMutations = this.executeMutations.bind(this);
		this.mutateBasket = this.mutateBasket.bind(this);
		this.mutatePass = this.mutatePass.bind(this);
		this.mutateTravelers = this.mutateTravelers.bind(this);
	}

	componentWillMount() {
		if (this.props.travelers.find(traveler => traveler.isNew)) {
			const promises = this.mutateTravelers();
			Promise.all(promises).then((responses) => {
				const oldIds = [...new Set(this.props.basketBuyingItems.map(item => item.travelerId.toString()))];
				const newIds = [...new Set(responses.map(response => response.data.createTraveler.traveler.id))];
				const ids = oldIds.map((oldId, index) => ({ old: oldId, new: newIds[index]}));
				responses.map(({ data }) => {
					const index = this.props.travelers.findIndex(traveler =>
						traveler.isNew === true && traveler.firstName, 10 === data.createTraveler.traveler.firstName
					);
					this.props.updateTraveler({
						isNew: false,
						index: index,
						id: data.createTraveler.traveler.id
					});
					this.props.updateBasketTravelerIds(ids);
				});
			})
		}
	}

	mutateBasket = () => {
		const travelersIds = [...new Set(this.props.basketBuyingItems.map(item => item.travelerId.toString()))];
		const items = this.props.basket.items.filter(item =>
			!travelersIds.includes(item.travelerId.toString())
		);
		this.props.validateBasket({
			variables: {
				input: {
					basketId: this.props.basket.id,
					userId: 1,
					state: this.props.basketState.value
				}
			}
		}).then(() => {
			if (this.props.basketState === EnumBasketState.PAID) {
				this.props.emptyBasket();
				this.props.history.push('/');
			}
			else {
				this.props.reinitializeBasket({...this.props.basket, items});
				this.props.history.push('/basket');
			}
		})
	};

	mutatePass = () => {
		const travelersIds = [...new Set(this.props.basketBuyingItems.map(item => item.travelerId))];
		travelersIds.forEach(travelerId => {
			const tickets = [];
			const travelerItems = this.props.basketBuyingItems.filter(item =>
				item.travelerId.toString() === travelerId.toString() && item.quantity > 0
			);
			travelerItems.forEach(travelerItem => tickets.push({
				activityId: travelerItem.product.id,
				quantity: travelerItem.quantity
			}));
			const variables = {
				variables: {
					input: {
						basketId: this.props.basket.id,
						startDate: this.props.startDate,
						endDate: this.props.endDate,
						destination: this.props.destination,
						pass: {
							userId: this.props.userId,
							travelerId: travelerId,
							tickets: tickets
						}
					}
				}
			};
			this.props.createPass(variables).then((data) => {
				console.log(data)
			})
		})
	};

	mutateTravelers = () => {
		const travelersIds = [...new Set(this.props.basketBuyingItems.map(item => item.travelerId.toString()))];
		const travelers = this.props.travelers.filter(traveler => travelersIds.includes(traveler.id.toString()));
		return travelers.map(traveler =>
			this.props.createTraveler({
				variables: {
					input: {
						firstName: traveler.firstName
					}
				}
			})
		);
	};


	executeMutations = () => {
		this.mutatePass();
		this.mutateBasket();
	};

	render() {
		if (parseInt(this.props.total, 10) === 0)
			return <div>Empty Basket</div>;
		return (
			<Button onClick={this.executeMutations}>
				{`Payer €${this.props.total}`}
			</Button>
		)
	}
}

const mapStateToProps = state => {
	let ids = (state.basketPage.travelers ?
		Object.keys(state.basketPage.travelers).filter(id =>
			state.basketPage.travelers[parseInt(id, 10)] === true &&
			state.travelDetails.travelers.find(traveler => parseInt(traveler.id, 10) === parseInt(id, 10))
		) : state.travelDetails.travelers.map(traveler => traveler.id)).map(Number);
	const items = state.basket.items ? state.basket.items.filter(item =>
		ids.includes(parseInt(item.travelerId, 10)) && item.quantity > 0
	) : [];
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		total: prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0,
		basketState: state.basket.items && state.basket.items.length === items.length ? EnumBasketState.PAID : EnumBasketState.HALF_PAID,
		basketBuyingItems: items,
		basket: state.basket,
		startDate: state.travelDetails.travelDates.startDate.format("YYYY-MM-DD"),
		endDate: state.travelDetails.travelDates.endDate.format("YYYY-MM-DD"),
		destination: state.travelDetails.destination,
		travelers: state.travelDetails.travelers,
		userId: 1,
	});
};

const mapDispatchToProps = dispatch => {
	return ({
		updateBasketTravelerIds: (ids) => dispatch(updateTravelerIds(ids)),
		updateTraveler: (traveler) => { dispatch(editTraveler(traveler)) },
		reinitializeBasket: (basket) => { dispatch(reinitializeBasket(basket)) },
		emptyBasket: () => { dispatch(emptyBasket()) }
	})
};

const withOptions = compose(
	graphql(CREATE_PASS, { name: 'createPass' }),
	graphql(VALIDATE_BASKET, { name: 'validateBasket' }),
	graphql(CREATE_TRAVELER, { name: 'createTraveler'}),
	connect(mapStateToProps, mapDispatchToProps)
);

export default withRouter(withOptions(PaymentButton));