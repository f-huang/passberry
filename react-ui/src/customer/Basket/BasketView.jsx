import React from "react";
import gql from "graphql-tag";

import { Mutation} from "react-apollo";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { CREATE_BASKET } from "../../queries";
import { setBasketId } from "../DestinationOffers/destinationOffersActions";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import Button from "../../component/Button/Button";
import moment from "moment";

class BasketView extends React.Component {
	render() {
		console.log("basket: ", this.props.basket);
		const basketItems = [...this.props.basket.items];
		const variables = {
			variables: {
				input : {
					initTime: moment(this.props.basket.initTime).format('YYYY-MM-DD hh:mm:ss'),
					lastUpdateTime: moment(this.props.basket.lastUpdateTime).format('YYYY-MM-DD hh:mm:ss'),
					items: this.props.basket.items.map(item =>
						({
							itemId: item.product.id,
							type: item.product.type,
							userId: item.travelerId,
							quantity: item.quantity,
						})
					)}
			}
		};
		return (
			<div>
			<BackActionBar to={'/' + (this.props.destination || "") } title={"Basket"}/>
			{ basketItems.map((item, index) =>
				<div key={index}>
					<p>{item.product.name}</p>
					<p>{item.quantity}</p>
				</div>
			)}
				<Mutation mutation={CREATE_BASKET}
				          update={(cache, { data: { createBasket } }) => {
				          	console.log(createBasket);
				          	this.props.onMutateSuccess(createBasket.basket.id);
				          }}
				>
					{(mutate) => { return (
					<div>
						<NavLink to={'/payment'}>
							<Button onClick={e => mutate(variables)}/>
						</NavLink>
					</div>
					)}}
				</Mutation>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		destination: state.travelDetails.destination,
		basket: state.basket
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onMutateSuccess: (id) => dispatch(setBasketId({ id: id }))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketView);