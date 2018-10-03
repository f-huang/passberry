import React from "react";

import { connect } from "react-redux";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import BasketButton from "./components/BasketButton";

const EnumArrangeItems = {
	CLASSIC: 'CLASSIC',
	PER_TRAVELER: 'PER_TRAVELER'
};


class BasketView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arrangeItems: EnumArrangeItems.CLASSIC
		};
		this.arrangeItems = this.arrangeItems.bind(this);
		this.arrangeItemsClassic = this.arrangeItemsClassic.bind(this);
		this.arrangeItemsPerTraveler = this.arrangeItemsPerTraveler.bind(this);
	}

	arrangeItemsClassic = () => {
		const ret = [];
		this.props.basket.items.map((item) => {
			const index = ret.findIndex(inRet => inRet.product.id === item.product.id);
			if (index !== -1)
				ret[index].quantity = ret[index].quantity + 1;
			else
				ret.push(item);
		});
		// ret.map(item => delete(item['travelerId']));
		return ret;
	};

	arrangeItemsPerTraveler = () => {
		const ret = [];
		this.props.basket.items.map((item) => {
			const index = ret.findIndex(inRet => inRet.travelerId === item.travelerId);
			if (index !== -1)
				ret[index].quantity = ret[index].quantity + 1;
			else
				ret.push(item);
		});
		return ret;
	};

	arrangeItems = () => {
		switch (this.state.arrangeItems) {
			case EnumArrangeItems.CLASSIC:
				return this.arrangeItemsClassic();
			case EnumArrangeItems.PER_TRAVELER:
				return this.arrangeItemsPerTraveler();
			default:
				return this.arrangeItemsClassic();
		}
	};

	render() {
		const items = this.props.basket.items;
		console.log(items);
		return (
			<div>
			<BackActionBar to={'/' + (this.props.destination || "") } title={"Panier"}/>
			{ items.map((item, index) =>
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
		travelers: state.travelDetails.travelers,
		basket: state.basket
	})
};


export default connect(mapStateToProps)(BasketView);