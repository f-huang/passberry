import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Traveler from "./Traveler";
import Button from "../../../component/Button/Button";
import theme from "../../../app/theme";
import {addTraveler, removeTraveler, editTraveler} from "../travelActions";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-around;
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
		this.props.onChangeEditTraveler({name: e.target.value, index: index})
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
					key={index} id={index} removable={index !== 0}
					onClick={e => this.onChangeRemoveTraveler(e, index)}
					onChange={e => this.onChangeEditTraveler(e, index)}
				/>
			));
		return (
			<Container>
				{travelersInputs}
				<Button
					value={"+"}
					style={{backgroundColor: theme.colorTertiary}}
					onClick={this.onClickAddTraveler}
				/>
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
		onClickAddTraveler: () => dispatch(addTraveler()),
		onClickRemoveTraveler: (index) => dispatch(removeTraveler(index)),
		onChangeEditTraveler: (traveler) => dispatch(editTraveler(traveler))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTravelers);