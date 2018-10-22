import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { removeTraveler, editTraveler } from "../travelActions";

import Traveler from "./Traveler";

const Container = styled.div`
	width: 100%;
	justify-content: space-around;
	max-height: 30vh;
	overflow-y: scroll;
`;


class ListTravelers extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			travelers: props.travelers || [],
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			travelers: props.travelers || this.state.travelers
		})
	}

	onChangeRemoveTraveler = (e, index) => {
		e.preventDefault();
		this.props.onClickRemoveTraveler(index);
	};

	onChangeEditTraveler = (e, index) => {
		this.props.onChangeEditTraveler({firstName: e.target.value, index: index})
	};

	onClickAddTraveler = e => {
		e.preventDefault();
		this.props.onClickAddTraveler();
	};

	render() {
		const travelersInputs = [];
		this.state.travelers.map((traveler, index) =>
			travelersInputs.push(
				<Traveler
					key={index} index={index} removable={index !== 0}
					onClick={e => this.onChangeRemoveTraveler(e, index)}
					onChange={e => this.onChangeEditTraveler(e, index)}
				/>
			));
		return (
			<Container>
				{travelersInputs}
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return ({
		travelers: state.travelDetails.travelers,
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onClickRemoveTraveler: (index) => dispatch(removeTraveler(index)),
		onChangeEditTraveler: (traveler) => dispatch(editTraveler(traveler))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTravelers);