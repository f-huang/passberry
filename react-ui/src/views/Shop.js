import React from "react";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import AppBar from "../component/AppBar/AppBar";
import EventCards from "../component/EventCard/EventCard";

const items = [
	{title: "1"},
	{title: "2"},
	{title: "3"},
];

class Shop extends React.Component {
	render() {
		return (
			<div className="Shop">
				<AppBar/>
				<EventCards items={items}/>
				<BottomNavigationBar/>
			</div>
		);
	}
}

export default Shop;