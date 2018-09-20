import React from "react";
import styled from "styled-components";
import TravelInput from "./TravelInput";
import PropTypes from "prop-types";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;


const inputStyle = {
	textAlign: 'center'
};

class TravelDateInput extends React.Component {
	static defaultProps = {
		startDate: 1,
		endDate: 1
	};

	static propTypes = {
		nTravelers: PropTypes.number
	};

	constructor(props) {
		super(props);
		if (props.startDate || props.endDate)
			this.state = {
				startDate: props.startDate || this.state.startDate,
				endDate: props.startDate || this.state.endDate
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
				<TravelInput style={inputStyle} />
			</Container>
		);
	}
}

export default TravelDateInput;