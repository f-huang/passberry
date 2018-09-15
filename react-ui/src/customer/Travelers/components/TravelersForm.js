import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { DESTINATION } from "../../localStorageKeys";
import { addTraveler, editTraveler, removeTraveler } from "../travelersActions";

import Traveler from "./Traveler";
import Button from "../../../component/Button/Button";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";

const Container = styled.div``;

class TravelersForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			travelers: props.travelers || [],
			nTravelers: props.nTravelers || 1,
		};
		this.destination = localStorage.getItem(DESTINATION) || "";
	}

	componentWillReceiveProps(props) {
		this.setState({
			nTravelers: props.nTravelers || this.state.nTravelers,
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

	render() {
		const travelersInputs = [];
		for (let index = 0; index < this.state.nTravelers; index++) {
			travelersInputs.push(
				<Traveler
					key={index} id={index} removable={index !== 0}
					onClick={e => this.onChangeRemoveTraveler(e, index)}
					onChange={e => this.onChangeEditTraveler(e, index)}
				/>
			)
		}
		return (
			<Container>
				{travelersInputs}
				<Button value={"+"} onClick={e => {
					e.preventDefault();
					this.props.onClickAddTraveler();
				}}/>
				<NavLink to={'/' + this.destination}>
					<ButtonSubmit value={"Next"}/>
				</NavLink>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return ({
		nTravelers: state.travelers.nTravelers,
		travelers: state.travelers.travelers,
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onClickAddTraveler: () => dispatch(addTraveler()),
		onClickRemoveTraveler: (index) => dispatch(removeTraveler(index)),
		onChangeEditTraveler: (traveler) => dispatch(editTraveler(traveler))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelersForm);