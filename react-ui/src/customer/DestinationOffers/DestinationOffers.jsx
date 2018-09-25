import React from "react";
import { connect } from "react-redux";
import BackSearchActionBar from "../../component/ActionBar/BackSearchActionBar";
import TravelRecap from "./components/TravelRecap.jsx";
import OffersByType from "./components/OffersByType";
import {addToBasket, removeFromBasket} from "./destinationOffersActions";

class DestinationOffers extends React.Component {

	constructor(props) {
		super(props);
		// this.destination = this.props.match.params.destination.toLocaleLowerCase();
		this.state = {
			basket: props.basket || [],
			travelers: props.travelers || [],
			startDate: props.startDate || 0,
			endDate: props.endDate || 0
		}
		//TODO:
		// if destination doesnt match
		// history.replace('/');
	}

	componentWillReceiveProps(props) {
		this.setState = ({
			basket: props.basket || this.state.basket,
			travelers: props.travelers || this.state.travelers,
			startDate: props.startDate || this.state.startDate,
			endDate: props.endDate || this.state.endDate
		});
	}

	render() {
		return (
			<div>
				<BackSearchActionBar to={'/'} onSearch={() => console.log("to")}/>
				<TravelRecap/>
				<OffersByType type={"Visites"} attractions={[{id: 1, name: "test"}]}/>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		basket: state.basket,
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: item => dispatch(addToBasket(item)),
		onClickRemoveItem: item => dispatch(removeFromBasket(item)),
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffers);