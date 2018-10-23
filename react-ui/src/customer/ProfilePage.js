import React from "react";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import TransparentActionBar from "../component/ActionBar/TransparentActionBar";

class ProfilePage extends React.Component {
	render() {
		return (
			<div>
				<TransparentActionBar/>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.profile}/>
			</div>
		);
	}
}

export default ProfilePage;