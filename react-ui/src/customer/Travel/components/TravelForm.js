import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setDestination } from "../travelActions";

import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import TravelInput from "./TravelInput";
import TravelNumberTravelersInput from "./TravelNumberTravelersInput";
import TravelDateInput from "./TravelDateInput";
import theme from "../../../app/theme";
import {NavLink} from "react-router-dom";

const Container = styled.div`
	background-color: ${theme.colorPrimary};
	width: 100%;
`;

const Form = styled.form`
	padding: 8px;
`;

const FormContainer = styled.div`
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	text-align-center;
`;

const BottomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: stretch; 
	width: 100%;
`;


const TopContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center; 
	width: 100%;
`;

const destStyle = {
	width: '100%'
};

class TravelForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			destination: props.destination || "",
			nTravelers: props.nTravelers || 1,
			isFormValid: false
		};
	};

	checkForm = () => {
		if (!this.state.isFormValid && this.state.destination && this.state.nTravelers > 0)
			this.setState({isFormValid: true});
		else if (this.state.isFormValid && (!this.state.destination || this.state.nTravelers < 1))
			this.setState({isFormValid: false});
	};

	componentDidMount() {
		this.checkForm();
	}

	componentDidUpdate() {
		this.checkForm();
	}

	componentWillReceiveProps(nextProps){
		if ((nextProps.destination !== undefined && nextProps.destination !== null) || nextProps.nTravelers) {
			this.setState({
				destination: nextProps.destination,
				nTravelers: nextProps.nTravelers || this.state.nTravelers
			});
		}
	}

	render() {
		return (
			<Container>
				<Form>
					<FormContainer>
						<TopContainer>
						<TravelInput
							name="destination"
							placeholder={"Trouver une destination..."}
							onChange={e => this.props.onChangeDestination(e.target.name, e.target.value)}
							style={destStyle}
							value={this.state.destination}
						/>
						</TopContainer>
						<BottomContainer>
							<TravelDateInput/>
							<TravelNumberTravelersInput
								name={"nTravelers"}
								value={this.state.nTravelers}
							/>
						</BottomContainer>
						<NavLink to={'/whoscoming'}>
							<ButtonSubmit isFormValid={this.state.isFormValid} value={"Go !"}/>
						</NavLink>
					</FormContainer>
				</Form>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return ({
		nTravelers: state.travel.nTravelers,
		destination: state.travel.destination
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onChangeDestination: (name, value) => dispatch(setDestination({[name]: value}))
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelForm);