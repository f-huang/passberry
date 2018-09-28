import React, { Component } from "react";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ADDRESS_BY_ID, GET_ATTRACTION_BY_ID } from "../queries";

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
			isDialogShowing: false
		}
	}

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
								<Category>{`Tarifs : ${attraction.price.adult} - ${attraction.price.child}` } </Category>
								<a href={'http://www.'+attraction.link}>{attraction.link}</a>
								<Query query={GET_ADDRESS_BY_ID} variables={{id: attraction.id}}>
									{({loading, error, data }) => {
										if (loading) return <p> Loading </p>;
										if (error) return <p> Error </p>;
										const address = data.getAddressById;
										return (
											<p>{address.street}, {address.postcode}{address.city}</p>
										)
									}}
								</Query>
								<TicketQuantity product={attraction} isShowing={this.state.isDialogShowing}/>
								<Button value={"Ajouter dans le panier"}  onClick={(e) =>
									this.setState({isDialogShowing: !this.state.isDialogShowing})
								        }
								/>
							</div>
						</App>
					);
				}}
			</Query>
		);
	}
}


export default withRouter(Attraction);