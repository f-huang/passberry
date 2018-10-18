import React, { Component } from "react";
import styled from "styled-components";
import qs from "query-string";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_ATTRACTION_BY_ID } from "../../queries";
import { showView } from "../TicketQuantity/ticketQuantityActions";
import { switchDetailsAreShowing } from "./attractionActions";

import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import Error404 from "../../Error404";
import TransparentActionBar from "../../component/ActionBar/TransparentActionBar";
import theme from "../../app/theme";

import defaultImg from "../../assets/monaco.jpg";

import AttractionDetails from "./components/ReducedAttractionDetails";
import ExpandedAttractionDetails from "./components/ExpandedAttractionDetails";
import ButtonNextStep from "../ButtonNextStep";
import TicketQuantity from "../TicketQuantity/TicketQuantity";

const Root = styled.div`
	
`;

const FloatingContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 80vh;
`;
const ImageContainer = styled.div`
	background-image: url(${props => props.image});
	background-size: cover;
	position: absolute:
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
`;

const Container = styled.div`
	position: relative;
	height: 100%;
`;

const TitleContainer = styled.div`
	position: absolute;
	bottom: 15vh;
	left: 50%;
	width: 100%;
	transform: translateX(-50%);
`;

const Title = styled.h1`
	font-weight: bolder;
	font-size: 36px;
	text-align: center;
	color: ${theme.colorInverse}
`;

const PriceContainer = styled.div`
	position: absolute;
	right: 15vw;
	top: 15vh; 
	min-width: 120px;
	background-color: ${theme.colorPurple};
	color: ${theme.colorInverse};
	padding: 8px;
	border-radius: 6px;
	box-shadow: 0 2px 2px 2px #000;
`;

const StartingFrom = styled.div`
	font-family: Nunito, serif;
	font-size: 12px;
	font-style: italic;
	text-align: start;
`;

const Price = styled.div`
	font-weight: 900;
	font-size: 16px;
	text-align: end;
`;

const Category = styled.p`
	font-size: 4vmin;
	font-weight: bold;
`;

const Description = styled.p`
	font-size: 3vmin;
`;

class AttractionView extends Component {
	state = { attraction: {} };

	constructor(props) {
		super(props);
		this.state = {
			attraction: {
				name: "",
				price: 0,
				description: "",
				type: "Unknown"
			},
		};
		this.onClickAddToCart = this.onClickAddToCart.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
	}

	onClickAddToCart = (e) => {
		e.preventDefault();
		this.props.onClickShowView()
	};

	onBackClick = (e) => {
		const params = qs.parse(this.props.location.search);
		const to = `/${this.props.destination}`;
		e.preventDefault();
		if (params.type) {
			const search = `?type=${params.type}`;
			this.props.history.push({ pathname: to, search});
		}
		else
			this.props.history.push(to);
	};

	render() {
		const id = this.props.match.params.id;
		return (
			<Query query={GET_ATTRACTION_BY_ID} variables={{id: id}}>
				{({loading, error, data }) => {
					if (loading) return <p> Loading </p>;
					if (error) return <p> Error </p>;
					const attraction = data.getAttractionById;
					if (!attraction)
						return <Error404/>;
					return (
						<Root>
							<ImageContainer image={defaultImg}>
							</ImageContainer>
							<TransparentActionBar onBackClick={this.onBackClick}/>
							<FloatingContainer>
								<Container>
									<TitleContainer><Title>{attraction.name}</Title></TitleContainer>
									<PriceContainer>
										<StartingFrom>{"à partir de"}</StartingFrom>
										<Price>{attraction.price.child.toFixed(2) + '€'}</Price>
									</PriceContainer>
								</Container>
							</FloatingContainer>
							{this.props.detailsAreShowing ?
								<ExpandedAttractionDetails attraction={attraction} onClick={this.onClickAddToCart}/> :
								<AttractionDetails attraction={attraction} onClick={this.onClickAddToCart}/>
							}
							<TicketQuantity product={attraction}/>
							<ButtonNextStep onClick={this.onClickAddToCart}>{"Ajouter dans le panier"}</ButtonNextStep>
							<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
						</Root>
					);
				}}
			</Query>
		);
	}
}

const mapStateToProps = state => ({
	destination: state.travelDetails.destination,
	detailsAreShowing: state.attractionPage.detailsAreShowing
});

const mapDispatchToProps = dispatch => ({
	onClickShowView: () => dispatch(showView()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttractionView));