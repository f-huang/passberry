import React from "react";
import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class SelectionsPage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.mySelections}
				title={`Mes sélections`}
				homeBtn
			>
			</App>
		);
	}
}

export default SelectionsPage;