import React from "react";
import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";


import { editDates } from "../travelActions";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

import "./css/date_range_picker.css";
import iconCalendar from "../../../assets/icons/calendar_black.svg";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const CalendarImg = styled.img`
	width: 16px;
	height: 16px;
`;

class TravelDateInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedInput: null
		};
		this.onDatesChange = this.onDatesChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
	}

	onDatesChange = (dates) => this.props.onChangeDates(dates);

	onFocusChange = (focusedInput) => this.setState({ focusedInput: focusedInput });

	render() {
		return (
			<Container>
				<CalendarImg src={iconCalendar} alt="icon-calendar"/>
				<DateRangePicker
					startDate={this.props.startDate}
					startDateId={"startDateId"}
					endDate={this.props.endDate}
					endDateId={"endDateId"}
					orientation={"vertical"}
					withPortal={true}
					focusedInput={this.state.focusedInput}
					onDatesChange={this.onDatesChange}
					onFocusChange={this.onFocusChange}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		startDate: state.travelDetails.travelDates.startDate,
		endDate: state.travelDetails.travelDates.endDate,
	})
} ;

const mapDispatchToProps = (dispatch) => {
	return ({
		onChangeDates: (dates) => dispatch(editDates(dates))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelDateInput);