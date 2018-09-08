import React from "react";
import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class ParametersPage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.parameters}
				title={`Paramètres`}
				homeBtn
			>
			</App>
		);
	}
}

export default ParametersPage;