import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TravelDateInput from "../../Travel/components/TravelDateInput";

const Container = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: space-between;
`;

const NumberContainer = styled.div`
	font-weight: bold;
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
				<NumberContainer>{this.state.travelers.length}</NumberContainer>
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