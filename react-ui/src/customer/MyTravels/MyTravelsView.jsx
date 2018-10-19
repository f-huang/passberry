import React from "react";
import App from "../../App";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";

class MyTravelsView extends React.Component {
	render() {
		return (
			<App itemSelected={BottomNavigationBar.items.myTravels} title={"Mes voyages"} homeBtn>
			</App>
		)
	}
}

export default MyTravelsView;