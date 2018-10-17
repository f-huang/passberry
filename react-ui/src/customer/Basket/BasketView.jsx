import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import BasketCreateButton from "./components/BasketCreateButton";
import BasketUpdateButton from "./components/BasketUpdateButton";
import ListClassicBasketItems from "./components/ListClassicBasketItems";
import ListPerTravelerBasketItems from "./components/ListPerTravelerBasketItems";
import ToggleBasketItemsLayout from "./components/ToggleBasketItemsLayout";
import EnumToggleItems from "./EnumItemsLayout";
import BasketRecap from "./components/BasketRecap";
import theme from "../../app/theme";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";

const Root = styled.div`
	min-height: 100%;
	background-color: ${theme.backgroundColor};
`;

const BasketDetails = styled.div`
	margin: 0 auto;
	position: relative;
	background-color: ${theme.colorInverse};
	border-radius: 6px;
	margin: 16px;
	padding: 16px;
	box-shadow: 0 1px 4px #000;
	font-size: 13px;
	width: 90%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	overflow-y: scroll;
	padding-top: 16px;
	padding-bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 72px);

`;

class BasketView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Root>
				<BackActionBar to={'/' + (this.props.destination || "") } title={"Panier"}/>
				<Container>
					<ToggleBasketItemsLayout/>
					<BasketDetails>
						{this.props.itemsLayout === EnumToggleItems.CLASSIC.value ?
							<ListClassicBasketItems/> :
							<ListPerTravelerBasketItems/>
						}
						<BasketRecap/>
					</BasketDetails>
					{this.props.isNewBasket ?
						<BasketCreateButton/> :
						<BasketUpdateButton/>
					}
				</Container>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
			</Root>
		)
	}
}

const mapStateToProps = state => {
	return ({
		isNewBasket: !(state.basket && state.basket.id),
		destination: state.travelDetails.destination,
		itemsLayout: state.basketPage.itemsLayout,
	});
};


export default connect(mapStateToProps)(BasketView);