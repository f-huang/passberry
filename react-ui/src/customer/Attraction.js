import React, { Component } from "react";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

import App from "../App";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import Carousel from "../component/Carousel/Carousel";
import apiCall from "../api";
import theme from "../app/theme";

import whiteHeart from "../assets/icons/heart_white.svg";

const query = `
	query AttractionGet($id: ID!) {
		AttractionGet(id: $id) {
			id
			name
			description
			price
			type
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

class Attraction extends Component {
	state = { attraction: {} };

	constructor(props) {
		super(props);
		this.setAttraction = this.setAttraction.bind(this);
		this.state = {
			attraction: {
				name: "",
				price: 0,
				description: "",
				type: "Unknown"
			}
		}
	}

	componentWillMount() {
		this.setAttraction(this.props.match.params.id);
	}


	setAttraction = (id) => {
		apiCall(query, {"id": id})
			.then(out => {
				const json = JSON.parse(out).data.getAttractionById;
				if (json)
					this.setState({ attraction: json });
			});
	};


	render() {
		const title = (this.state.attraction ? this.state.attraction.name : this.props.match.params.name);
		return (
			<App title={title} itemSelected={BottomNavigationBar.items.currentTrip} backBtn homeBtn>
				<TopContainer>
					<Carousel/>
					<AddButton>+</AddButton>
					<HeartButton/>
				</TopContainer>
				<Title>{title}</Title>
				<Category>{"Tarifs"}</Category>
				<Category>{"Temps de visite"}</Category>
				<Category>{"Horaires"}</Category>
				<Category>{"Adresse"}</Category>
			</App>
		);
	}
}

export default withRouter(Attraction);