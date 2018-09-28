import React, { Component } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import { Query } from "react-apollo";

import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import theme from "../app/theme";

import whiteHeart from "../assets/icons/heart_white.svg";
import Button from "../component/Button/Button";
import TicketQuantity from "./TicketQuantity/TicketQuantity";

const attractionQL = gql`
	query getAttractionById($id: ID!) {
		getAttractionById(id: $id) {
			id
			name
			description
			link
			price {
				adult
				child
				maxAgeForChild
			}
			type
		}
	}
`;

const addressQL = gql`
	query getAddressById($id: ID!) {
	    getAddressById(id:$id) {
			id
			street
			supplement
			city
			postcode
			countryCode
		}
	}
`;


const TopContainer = styled.div`
	position: relative;
`;

const Title = styled.h1`
	font-weight: bold;
	font-size: 5vmin;
`;

const Category = styled.p`
	font-size: 4vmin;
	font-weight: bold;
`;

const AddButton = styled.button`
	width: 36px;
	height: 36px;
	position: absolute;
	right: 20px;
	top: 20px;
	border: 2px solid ${theme.colorInverse};
	border-radius: 50%;
	color: ${theme.colorInverse};
	background-color: transparent;
	font-weight: bolder;
	font-size: 1em;
`;

const HeartButton = styled.button`
	width: 36px;
	height: 36px;
	position: absolute;
	right: 20px;
	bottom: 20px;
	border: 2px solid ${theme.colorInverse};
	background: url(${whiteHeart}) no-repeat center;
	background-size: 24px;
	border-radius: 50%;
	font-weight: bolder;
	font-size: 1em;
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
			<Query query={attractionQL} variables={{id: id}}>
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
								<Query query={addressQL} variables={{id: attraction.id}}>
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