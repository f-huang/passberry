import React from "react";
import styled from "styled-components";
import TravelInput from "./TravelInput";
import theme from "../../../app/theme";
import { addTraveler, removeTraveler } from "../travelActions";
import { connect } from "react-redux";

const Container = styled.div`
	display: flex;
	height: 100%;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	border-radius: 2px;
	overflow: hidden;
`;

const MinusPlusButton = styled.button`
	padding: 14px 6px;
	text-align: center;
	background-color: ${theme.colorInverse};
	border: 0;
	margin: 0;
	flex: 1;
	
	&:focus {
		outline: none;
	}
`;

const inputStyle = {
	flex: 1,
	textAlign: 'center',
	width: '11vw',
	margin: 0,
	borderRadius: 0
};

class TravelNumberTravelersInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { nTravelers: props.nTravelers || 1 }
	}

	componentWillReceiveProps(props) {
		this.setState({ nTravelers: props.nTravelers || this.state.nTravelers })
	}

	render() {
		return (
			<Container>
				<MinusPlusButton onClick={e => {
					e.preventDefault();
					this.props.onClickMinus(this.props.value)
				}}>-</MinusPlusButton>
				<TravelInput
					style={inputStyle}
					readOnly
					{...this.props}
					value={this.state.nTravelers}
				/>
				<MinusPlusButton onClick={e => {
					e.preventDefault();
					this.props.onClickPlus(this.props.value)
				}}>+</MinusPlusButton>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return ({
		nTravelers: state.travelDetails.travelers.length
	})
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClickMinus: currentValue => {
			if (currentValue > 1)
				return dispatch(removeTraveler());
		},
		onClickPlus: () => { return dispatch(addTraveler()); }
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelNumberTravelersInput);