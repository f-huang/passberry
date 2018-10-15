import React from "react";
import styled from "styled-components";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";


import { editDates } from "../travelActions";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";


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
			<DateRangePicker
				startDate={this.props.startDate}
				startDateId={"startDateId"}
				endDate={this.props.endDate}
				endDateId={"endDateId"}
				orientation={ "vertical" }
				withPortal={true}
				focusedInput={this.state.focusedInput}
				onDatesChange={this.onDatesChange}
				onFocusChange={this.onFocusChange}
			/>
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