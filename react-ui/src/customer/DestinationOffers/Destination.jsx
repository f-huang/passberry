import React from "react";
import qs from "query-string";
import styled from "styled-components";

import DestinationOffersSeeByTypeView from "./DestinationOffersSeeByTypeView";
import DestinationOffers from "./DestinationOffers";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import Button from "../../component/Button/Button";
import theme from "../../app/theme";
import DestinationActionBar from "../../component/ActionBar/DestinationActionBar";
import TravelRecap from "./components/TravelRecap";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${theme.backgroundColor};
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	overflow-y: scroll;
	padding-bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 72px);
`;

const ButtonBasket = styled(Button)`
	background-color: ${theme.colorYellow};
	position: fixed;
	bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 24px);
	left: 50%;
	transform: translateX(-50%);
	width: 50vw;
	max-width: 280px;
`;

class Destination extends React.Component {
	constructor(props) {
		super(props);
		this.queryParams = qs.parse(this.props.location.search);
		//TODO:
		// if destination doesnt match
		// history.replace('/');

	}

	render() {
		const middleContainer = this.queryParams.type ? <DestinationOffersSeeByTypeView type={this.queryParams.type}/> : <DestinationOffers/>;
		const to = this.queryParams.type ? `/${this.props.destination}` : '/';
		return (
			<Root>
				<div>
					<DestinationActionBar to={to} title={this.props.destination}/>
					<TravelRecap/>
				</div>
				<Container>
					{middleContainer}
					<NavLink to={'/basket'}>
						<ButtonBasket value={`Panier : ${this.props.total}€`}/>
					</NavLink>
				</Container>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
			</Root>
		);
	}
}

const mapStateToProps = state => {
	const items = state.basket.items;
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		total: prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0,
		destination: state.travelDetails.destination
	})
};

export default connect(mapStateToProps)(Destination);