import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TravelDateInput from "../../Travel/components/TravelDateInput";

const Container = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const NumberContainer = styled.div`
	font-size: 0.6em;
	font-weight: bold;
`;

const Name = styled.div`
	font-size: 0.4em;
	font-weight: lighter;
`;


class TravelRecap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			travelers: props.travelers || [],
			startDate: props.startDate || null,
			endDate: props.endDate || null,
		}
	}

	render() {
		return (
			<Container>
				<TravelDateInput/>
				<NumberContainer>{this.state.travelers.length}{" people coming :"}</NumberContainer>
				<Name>{this.state.travelers.map((traveler, index) => traveler.name + (index + 1 === this.state.travelers.length ? '' : ', '))}</Name>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		travelers: state.travelDetails.travelers,
	});
};

export default connect(mapStateToProps)(TravelRecap);