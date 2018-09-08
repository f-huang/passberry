import React from "react";
import ShoppingView from "./ShoppingView";
import App from "../../App";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";

// import imageTest from "../assets/Coucher-de-soleil.jpg";

class Shop extends React.Component {
	render() {
		return (
			<App title={"Discovery Pass"}
			     itemSelected={ BottomNavigationBar.items.currentTrip }>
				<ShoppingView/>
			</App>
		);
	}
}

export default Shop;