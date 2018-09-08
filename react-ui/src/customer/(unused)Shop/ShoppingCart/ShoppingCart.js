import React, { Component } from "react";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import AppBar from "../../../component/AppBar/AppBar";
import BottomNavigationBar from "../../../component/BottomNavigationBar/BottomNavigationBar";

class ShoppingCartItem extends Component {

	static propTypes = {
		item: PropTypes.object.isRequired
	};

	render() {
		return (
			<li className={"ShoppingCartItem"}>
				<h4 className={"ShoppingCartItem-name"}>{ this.props.item.name }</h4>
				<h5 className={"ShoppingCartItem-price"}>{ this.props.item.price }</h5>
			</li>
		);
	}
}


class ShoppingCart extends Component {

	state = {
		items: this.props.cookies.get('attraction'),
	};

	render() {
		let totalPrice = 0;
		const rows = [];

		this.state.items.map((item) => {
			totalPrice += item.price;
			return rows.push(<ShoppingCartItem key={item.name} item={ item }/>);
		});

		return (
			<div className={"ShoppingCart"}>
				<AppBar title={"Shopping Cart"}/>
				<ul className={"ShoppingCart-list"}>{ rows }</ul>
				<span>Total: { totalPrice }€ </span>
				<BottomNavigationBar itemSelected={"currentTrip"}/>
			</div>
		);
	}
}

export default withCookies(ShoppingCart);