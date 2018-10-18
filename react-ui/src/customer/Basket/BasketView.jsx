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
	width: 100%;
	height: 100%;
	background-color: ${theme.backgroundColor};
	display: flex;
	flex-direction: column;
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

const Wrapper = styled.div`
	margin: 16px;
`;

const Container = styled.div`
	overflow-y: scroll;
	padding-bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 72px);

`;

const BasketView = (props) => (
	<Root>
		<div>
			<BackActionBar to={'/' + (props.destination || "") } title={"Panier"}/>
		</div>
		<Container>
			<Wrapper>
				<ToggleBasketItemsLayout/>
			</Wrapper>
			<BasketDetails>
				{props.itemsLayout === EnumToggleItems.CLASSIC.value ?
					<ListClassicBasketItems/> :
					<ListPerTravelerBasketItems/>
				}
				<BasketRecap/>
			</BasketDetails>
			{props.isNewBasket ?
				<BasketCreateButton/> :
				<BasketUpdateButton/>
			}
		</Container>
		<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
	</Root>
);

const mapStateToProps = state => {
	return ({
		isNewBasket: !(state.basket && state.basket.id),
		destination: state.travelDetails.destination,
		itemsLayout: state.basketPage.itemsLayout,
	});
};


export default connect(mapStateToProps)(BasketView);