import React from "react";
import qs from "query-string";
import styled from "styled-components";

import DestinationOffersSeeByTypeView from "./DestinationOffersSeeByTypeView";
import DestinationOffers from "./DestinationOffersSeeAll";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import theme from "../../app/theme";
import DestinationActionBar from "../../component/ActionBar/DestinationActionBar";
import TravelRecap from "./components/TravelRecap";

import ButtonCurrentBasket from "./components/ButtonCurrentBasket.jsx";

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

class DestinationView extends React.Component {
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
					<ButtonCurrentBasket/>
				</Container>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
			</Root>
		);
	}
}

export default (DestinationView);