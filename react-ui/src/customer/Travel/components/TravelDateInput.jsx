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
	
	.DateRangePickerInput {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
	
	.DateInput {
		width: 40%;
	}
	
	.DateInput_input {
		width: 100%;
	}
`;

const Wrap = styled.div`
	padding: 0 2px 0 8px;
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
				<Wrap>
					<CalendarImg src={iconCalendar} alt="icon-calendar"/>
				</Wrap>
				<DateRangePicker
					startDate={this.props.startDate}
					startDateId={"startDateId"}
					endDate={this.props.endDate}
					endDateId={"endDateId"}
					orientation={"vertical"}
					withPortal={true}
					withFullScreenPortal={true}
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