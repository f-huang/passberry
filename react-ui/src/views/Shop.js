import React from "react";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import AppBar from "../component/AppBar/AppBar";

class Shop extends React.Component {
	render() {
		return (
			<div className="Shop">
				<AppBar/>
				<BottomNavigationBar/>
			</div>
		);
	}
}

export default Shop;