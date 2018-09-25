import React from "react";
import styled from "styled-components";
import "react-dates/initialize";
import 'react-dates/lib/css/_datepicker.css';


import {editDates, editEndDate, editStartDate} from "../travelActions";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;


const inputStyle = {
	textAlign: 'center'
};

class TravelDateInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.startDate || null,
			endDate: props.endDate || null
		};
	}


	componentWillReceiveProps(props) {
		if (props.startDate || props.endDate)
			this.setState({
				startDate: props.startDate || this.state.startDate,
				endDate: props.startDate || this.state.endDate
			});
	}

	render() {
		return (
			<Container>
				<DateRangePicker
					startDate={this.state.startDate}
					startDateId={"startDateId"}
					endDate={this.state.endDate}
					endDateId={"endDateId"}
					onDatesChange={this.props.onChangeDates}
					orientation={ "vertical" }
					withPortal={true}
					focusedInput={this.state.focusedInput}
					onFocusChange={focusedInput => {
						this.setState({ focusedInput })
					}}
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
		onChangeStartDate: (value) => dispatch(editStartDate(value)),
		onChangeEndDate: (value) => dispatch(editEndDate(value)),
		onChangeDates: (dates) => dispatch(editDates(dates))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelDateInput);