import React from "react";
import TravelForm from "./components/TravelForm";
import ScreenTitle from "../ScreenTitle";
import ScreenSubtitle from "../ScreenSubtitle";
import theme from "../../app/theme";

const style = {
	backgroundColor: theme.colorPrimary,
	overflow: 'hidden',
	width: '100%',
	height: '100%'
};

const TravelView = (props) => (
	<div style={style}>
		<ScreenTitle>Vuego</ScreenTitle>
		<ScreenSubtitle>{"Où allons-nous ?"}</ScreenSubtitle>
		<TravelForm/>
	</div>
);


export default TravelView;