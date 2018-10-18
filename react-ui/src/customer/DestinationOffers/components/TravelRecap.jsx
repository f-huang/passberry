import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import TravelDateInput from "../../Travel/components/TravelDateInput";
import iconPerson from "../../../assets/icons/person_black.svg";
import theme from "../../../app/theme";

const Container = styled.div`
	position: relative;
	padding: 0px 8px;
	font-size: 12px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	background-color: ${theme.colorInverse};
	border-bottom: 1px solid ${theme.borderColor};
	border-top: 1px solid ${theme.borderColor};
`;

const NumberContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Number = styled.span`
	padding: 4px;
`;

const PersonImg = styled.img`
	width: 16px;
	height: 16px;
`;

class TravelRecap extends React.Component {
	render() {
		return (
			<Container>
				<TravelDateInput/>
				<NumberContainer>
					<PersonImg src={iconPerson} alt="icon-person"/>
					<Number>{ this.props.travelers.length }</Number>
				</NumberContainer>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		travelers: state.travelDetails.travelers || [],
	});
};

export default connect(mapStateToProps)(TravelRecap);