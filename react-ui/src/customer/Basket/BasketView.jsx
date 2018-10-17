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


const Container = styled.div`
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

const Root = styled.div`
	min-height: 100%;
`;

class BasketView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Root>
				<BackActionBar to={'/' + (this.props.destination || "") } title={"Panier"}/>
				<ToggleBasketItemsLayout/>
				<Container>
					{this.props.itemsLayout === EnumToggleItems.CLASSIC.value ?
						<ListClassicBasketItems/> :
						<ListPerTravelerBasketItems/>
					}
					<BasketRecap/>
				</Container>
				{this.props.isNewBasket ?
					<BasketCreateButton/> :
					<BasketUpdateButton/>
				}
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