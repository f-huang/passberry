import React from "react";
import theme from "../../app/theme";
import TravelersForm from "./components/TravelersForm";
import ScreenSubtitle from "../ScreenSubtitle";
import { DESTINATION } from "../localStorageKeys";
import { withRouter } from "react-router-dom";

const style = {
	backgroundColor: theme.colorPrimary,
	overflow: 'hidden',
	width: '100%',
	height: '100%'
};

const destination = localStorage.getItem(DESTINATION);

const TravelersView = (props) => {
	if (destination)
		return (
			<div style={style}>
				<ScreenSubtitle>{"Les Vuego voyageurs"}</ScreenSubtitle>
				<TravelersForm/>
			</div>
		);
	else
		return props.history.push('/');
};


export default withRouter(TravelersView);