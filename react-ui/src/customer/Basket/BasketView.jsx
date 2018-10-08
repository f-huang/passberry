import React from "react";

import { connect } from "react-redux";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import BasketCreateButton from "./components/BasketCreateButton";
import BasketUpdateButton from "./components/BasketUpdateButton";
import ListClassicBasketItems from "./components/ListClassicBasketItems";
import ListPerTravelerBasketItems from "./components/ListPerTravelerBasketItems";
import ToggleBasketItemsLayout from "./components/ToggleBasketItemsLayout";
import EnumToggleItems from "./EnumItemsLayout";
import BasketTotal from "./components/BasketTotal";


class BasketView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<BackActionBar to={'/' + (this.props.destination || "") } title={"Panier"}/>
				<ToggleBasketItemsLayout/>
				{this.props.itemsLayout === EnumToggleItems.CLASSIC.value ?
					<ListClassicBasketItems/> :
					<ListPerTravelerBasketItems/>
				}
				<BasketTotal/>
				{this.props.isNewBasket ?
					<BasketCreateButton/> :
					<BasketUpdateButton/>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		isNewBasket: !(state.basket && state.basket.id),
		destination: state.travelDetails.destination,
		itemsLayout: state.basketPage.itemsLayout,
	});
};


export default connect(mapStateToProps)(BasketView);