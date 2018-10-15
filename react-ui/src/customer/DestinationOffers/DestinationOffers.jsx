import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ATTRACTION_BY_TYPE } from "../../queries";
import { addToBasket, removeFromBasket } from "../Basket/basketActions";

import DestinationActionBar from "../../component/ActionBar/DestinationActionBar";
import TravelRecap from "./components/TravelRecap.jsx";
import OffersByType from "./components/OffersByType";
import Button from "../../component/Button/Button";
import theme from "../../app/theme";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";

const View = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${theme.backgroundColor};
`;

const Container = styled.div`
`;

const ButtonBasket = styled(Button)`
	background-color: ${theme.colorYellow};
	position: fixed;
	bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 24px);
	left: 50%;
	transform: translateX(-50%);
`;

class DestinationOffers extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			basket: props.basket || [],
			travelers: props.travelers || [],
			startDate: props.startDate || 0,
			endDate: props.endDate || 0,
		}
		//TODO:
		// if destination doesnt match
		// history.replace('/');
	}

	componentWillReceiveProps(props) {
		this.setState = ({
			basket: props.basket || this.state.basket,
			travelers: props.travelers || this.state.travelers,
			startDate: props.startDate || this.state.startDate,
			endDate: props.endDate || this.state.endDate
		});
	}

	render() {
		return (
			<View>
				<DestinationActionBar to={'/'} title={this.props.destination}/>
				<TravelRecap/>
				<Container>
					<Query query={GET_ATTRACTION_BY_TYPE} variables={{type: "ATTRACTION"}}>
						{({loading, error, data}) => {
							if (loading) return <p> Loading </p>;
							if (error) return <p> Error : </p>;
							return <OffersByType type={"Visites"} attractions={data.getAttractionByType}/>;
						}}
					</Query>
					<Query query={GET_ATTRACTION_BY_TYPE} variables={{type: "RESTAURANT"}}>
						{({loading, error, data}) => {
							if (loading) return <p> Loading </p>;
							if (error) return <p> Error : </p>;
							return <OffersByType type={"Restaurants"} attractions={data.getAttractionByType}/>;
						}}
					</Query>
					<NavLink to={'/basket'}>
						<ButtonBasket value={`Panier : ${this.props.total}€`}/>
					</NavLink>
				</Container>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const ids = state.basketPage.travelers ?
		Object.keys(state.basketPage.travelers).filter(id =>
			state.basketPage.travelers[id] === true
		) : null;
	const items = !ids || ids.length === 0 ?
		state.basket.items :
		state.basket.items.filter(item =>
			ids.find(id => parseInt(item.travelerId, 10) === parseInt(id, 10))
		);
	const quantities = items ? items.map(item => item.quantity) : [];
	const prices = items ? items.map(item => item.product.price.adult) : [];
	return ({
		total: prices.length > 0 ? prices.reduce((total, currentPrice, index) => total + quantities[index] * currentPrice).toFixed(2) : 0,
		basket: state.basket,
		destination: state.travelDetails.destination
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: item => dispatch(addToBasket(item)),
		onClickRemoveItem: item => dispatch(removeFromBasket(item)),
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffers);