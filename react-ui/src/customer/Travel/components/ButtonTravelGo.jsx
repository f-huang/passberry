import React from "react";
import styled from "styled-components";
import { connect } from "react-redux"
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";

const ButtonGo = styled(ButtonSubmit)`
	margin: 16px auto;
	width: 100%;
`;

const isClickable = ({ destination, startDate, endDate, travelers}) => {
	if (!destination || destination.trim().length === 0 || startDate === null || endDate === null)
		return false;
	return !travelers.find(traveler => traveler && traveler.firstName.trim().length === 0);
};

const ButtonTravelGo = (props) =>
	<ButtonGo isClickable={isClickable(props)}>
		{"Go !"}
	</ButtonGo>;

const mapStateToProps = (state) => ({
	destination: state.travelDetails.destination,
	startDate: state.travelDetails.travelDates.startDate,
	endDate: state.travelDetails.travelDates.endDate,
	travelers: state.travelDetails.travelers
});

export default connect(mapStateToProps)(ButtonTravelGo);