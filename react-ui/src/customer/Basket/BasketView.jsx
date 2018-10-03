import React from "react";

import { connect } from "react-redux";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import BasketButton from "./components/BasketButton";
import ListBasketItems from "./components/ListBasketItems";
import ToggleBasketItemsLayout from "./components/ToggleBasketItemsLayout";


class BasketView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<BackActionBar to={'/' + (this.props.destination || "") } title={"Panier"}/>
				<ToggleBasketItemsLayout/>
				<ListBasketItems/>
				<BasketButton/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		destination: state.travelDetails.destination,
		travelers: state.travelDetails.travelers,
	})
};


export default connect(mapStateToProps)(BasketView);