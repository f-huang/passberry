import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import ButtonNextStep from "../../../component/ButtonNextStep";

const ButtonCurrentBasket = (props) => {
	return (
		<NavLink to={'/basket'}>
			<ButtonNextStep>{`Panier : ${props.total}€`}</ButtonNextStep>
		</NavLink>
	);
};


const mapStateToProps = state => {
	let ids = state.travelDetails.travelers.map(traveler => traveler.id).map(Number);
	const items = state.basket.items.filter(item => ids.includes(parseInt(item.travelerId, 10)) && item.quantity > 0);
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		total: prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0,
		destination: state.travelDetails.destination
	})
};

export default connect(mapStateToProps)(ButtonCurrentBasket)