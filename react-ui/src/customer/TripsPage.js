import React from "react";
import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class TripsPage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.currentTrip}
				title={`Mes voyages`}
				homeBtn
			>
			</App>
		);
	}
}

export default TripsPage;