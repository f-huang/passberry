import React from "react";

import { connect } from "react-redux";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import BasketButton from "./BasketButton";

class BasketView extends React.Component {
	render() {
		console.log("basket: ", this.props.basket);
		const basketItems = this.props.basket.items ? [...this.props.basket.items] : [];

		return (
			<div>
			<BackActionBar to={'/' + (this.props.destination || "") } title={"Basket"}/>
			{ basketItems.map((item, index) =>
				<div key={index}>
					<p>{item.product.name}</p>
					<p>{item.quantity}</p>
				</div>
			)}
				<BasketButton/>
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


export default connect(mapStateToProps)(BasketView);