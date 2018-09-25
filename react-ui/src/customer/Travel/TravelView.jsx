import React from "react";
import TravelForm from "./components/TravelForm";
import ScreenTitle from "../ScreenTitle";
import ScreenSubtitle from "../ScreenSubtitle";
import theme from "../../app/theme";
import ListTravelers from "./components/ListTravelers";
import styled from "styled-components";
import ButtonSubmit from "../../component/Button/ButtonSubmit/ButtonSubmit";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const style = {
	backgroundColor: theme.colorPrimary,
	overflow: 'hidden',
	width: '100%',
	height: '100%'
};

const Form = styled.form`
	padding: 8px;
`;

const TravelView = (props) => (
	<div style={style}>
		<ScreenTitle>Vuego</ScreenTitle>
		<ScreenSubtitle>{"Où allons-nous ?"}</ScreenSubtitle>
		<Form>
			<TravelForm/>
			<ListTravelers/>
			<NavLink to={'/' + props.destination}>
				<ButtonSubmit value={"Go !"}/>
			</NavLink>
		</Form>
	</div>
);

const mapStateToProps = state => ({
	destination: state.travelDetails.destination || ""
});

export default connect(mapStateToProps)(TravelView);