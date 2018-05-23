import React from "react";
import AppBar from "../component/AppBar/AppBar";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class Profile extends React.Component {
	render() {
		return (
			<div className="Profile">
				<AppBar title="User Profile"/>
				<BottomNavigationBar itemSelected="Profile"/>
			</div>
		);
	}
}

export default Profile;