import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BackSearchActionBar from "../../component/ActionBar/BackSearchActionBar";

const TravelRecapContainer = styled.div`
	position: fixed;
	height: 7vh;
`;


class DestinationOffers extends React.Component {

	constructor(props) {
		super(props);
		this.destination = this.props.match.params.destination.toLocaleLowerCase();
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
				<TravelRecapContainer>
					{this.state.nTravelers}
					{this.state.travelers.map(traveler => traveler.name)}
				</TravelRecapContainer>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return ({
		basket: state.destinationOffers.basket,
		nTravelers: state.destinationOffers.nTravelers,
		travelers: state.destinationOffers.travelers
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({

	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffers);