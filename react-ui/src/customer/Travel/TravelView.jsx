import React from "react";
import TravelForm from "./components/TravelForm";
import ScreenTitle from "../../component/ScreenTitle";
import ScreenSubtitle from "../../component/ScreenSubtitle";
import ListTravelers from "./components/ListTravelers";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";

import backgroundImg from "../../assets/felipe-correia-469512-unsplash.jpg"
import theme from "../../app/theme";
import ButtonTravelGo from "./components/ButtonTravelGo";

const Root = styled.div`
	overflow: hidden;
	width: 100%;
	height: 100%
	color: ${theme.colorInverse};

	&:after {
		position: absolute;
		content: "";
		z-index: -1;
		top: 0;
		left: 0;
		opacity: 0.6;
		background: url(${backgroundImg}) no-repeat;
		background-size: cover;
		width: 100%;
		height: 100%;
	}
`;

const Container = styled.div`
	padding: 24px;
`;

const Form = styled.form`
	padding: 8px;
	margin: 0 auto;
	max-width: 400px;
`;

const TravelView = (props) => (
	<Root>
		<Container>
			<ScreenTitle>Vuego</ScreenTitle>
			<ScreenSubtitle>{"Où allons-nous ?"}</ScreenSubtitle>
			<Form>
				<TravelForm/>
				<ListTravelers/>
				<NavLink to={'/' + props.destination}>
					<ButtonTravelGo/>
				</NavLink>
			</Form>
		</Container>
		<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
	</Root>
);

const mapStateToProps = state => ({
	destination: state.travelDetails.destination || "",
});

export default connect(mapStateToProps)(TravelView);