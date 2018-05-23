import React from "react";
import AppBar from "../component/AppBar/AppBar";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class Pass extends React.Component {
	render() {
		return (
			<div className="Pass">
				<AppBar title="Pass"/>
				<BottomNavigationBar itemSelected="Pass"/>
			</div>
		);
	}
}

export default Pass;