import React from "react";
import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";

class ProfilePage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.profile}
				title={`Mon profil`}
				homeBtn
			>
			</App>
		);
	}
}

export default ProfilePage;