import React, { Component } from "react";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_ATTRACTION_BY_ID } from "../queries";
import { showView } from "./TicketQuantity/ticketQuantityActions";

import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import Button from "../component/Button/Button";
import TicketQuantity from "./TicketQuantity/TicketQuantity";


const Title = styled.h1`
	font-weight: bold;
	font-size: 5vmin;
`;

const Category = styled.p`
	font-size: 4vmin;
	font-weight: bold;
`;

const Description = styled.p`
	font-size: 3vmin;
`;

class Attraction extends Component {
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
		}
		this.onClickAddToCart = this.onClickAddToCart.bind(this);
	}

	onClickAddToCart = (e) => {
		e.preventDefault();
		this.props.onClickShowView()
	};

	render() {
		const id = this.props.match.params.id;
		return (
			<Query query={GET_ATTRACTION_BY_ID} variables={{id: id}}>
				{({loading, error, data }) => {
					if (loading) return <p> Loading </p>;
					if (error) return <p> Error </p>;
					const attraction = data.getAttractionById;
					return (
						<App title={attraction.name} itemSelected={BottomNavigationBar.items.currentTrip} backBtn homeBtn>
							<div>
								<Title>{attraction.name}</Title>
								<Description>
									{attraction.description}
								</Description>
								<Category>{`Tarifs : ${attraction.price.adult}`} {attraction.price.child && ' - ' + attraction.price.child} </Category>
								<a href={'http://www.'+attraction.link}>{attraction.link}</a>
								<p>
									{attraction.address.street} {attraction.address.supplement && attraction.address.supplement}
									{attraction.address.postcode} {attraction.address.city}
								</p>
								<TicketQuantity product={attraction}/>
								<Button onClick={this.onClickAddToCart}>{"Ajouter dans le panier"}</Button>
							</div>
						</App>
					);
				}}
			</Query>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onClickShowView: () => dispatch(showView())
});


export default withRouter(connect(null, mapDispatchToProps)(Attraction));