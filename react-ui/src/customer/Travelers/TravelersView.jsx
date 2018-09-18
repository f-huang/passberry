import React from "react";
import theme from "../../app/theme";
import TravelersForm from "./components/TravelersForm.jsx";
import ScreenSubtitle from "../ScreenSubtitle";
import { DESTINATION } from "../localStorageKeys";
import { withRouter } from "react-router-dom";
import BackActionBar from "../BackActionBar/BackActionBar";

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
				<BackActionBar to={'/'}/>
				<ScreenSubtitle>{"Les Vuego voyageurs"}</ScreenSubtitle>
				<TravelersForm/>
			</div>
		);
	else
		return props.history.push('/');
};


export default withRouter(TravelersView);