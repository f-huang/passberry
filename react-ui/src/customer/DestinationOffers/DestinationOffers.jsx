import React from "react";
import { connect } from "react-redux";
import BackSearchActionBar from "../../component/ActionBar/BackSearchActionBar";
import TravelRecap from "./components/TravelRecap.jsx";
import OffersByType from "./components/OffersByType";

class DestinationOffers extends React.Component {

	constructor(props) {
		super(props);
		// this.destination = this.props.match.params.destination.toLocaleLowerCase();
		this.state = {
			basket: props.basket || [],
			nTravelers: props.nTravelers || 1,
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
			basket: props.basket || [],
			nTravelers: props.nTravelers || 1,
			travelers: props.travelers || [],
			startDate: props.startDate || 0,
			endDate: props.endDate || 0
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
		basket: state.destinationOffers.basket,
		travelers: state.destinationOffers.travelers,
		nTravelers: state.destinationOffers.travelers.length,
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({

	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffers);