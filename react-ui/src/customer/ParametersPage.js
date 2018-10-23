import React from "react";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import TransparentActionBar from "../component/ActionBar/TransparentActionBar";

class ParametersPage extends React.Component {
	render() {
		return (
			<div>
				<TransparentActionBar/>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.parameters}/>
			</div>
		);
	}
}

export default ParametersPage;