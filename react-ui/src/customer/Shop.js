import React from "react";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import AppBar from "../../component/AppBar/AppBar";
import Carousel from "../../component/Carousel/Carousel";


import imageTest from "../../assets/Coucher-de-soleil.jpg";

const items = [
	{title: "1", image: imageTest},
];

class Shop extends React.Component {
	render() {
		return (
			<div className="Shop">
				<AppBar/>
				<Carousel items={items}/>
				<BottomNavigationBar itemSelected="Shop"/>
			</div>
		);
	}
}

export default Shop;