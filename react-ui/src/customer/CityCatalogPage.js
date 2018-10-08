import React from "react";
import AppBar from "../component/AppBar/AppBar";
import SearchBar from "../component/SearchBar";
import styled from "styled-components";
import theme from "../app/theme";


import monacoImg from "../assets/monaco.jpg";
import PassInputsHandler from "./(unused)Pass/PassInputsHandler";
const N_CELL_PER_ROW = window.innerWidth > 1000 ? 5 : (window.innerWidth < 500 ? 2 : 3);

const searchBarStyle = {
	border: '1px solid ' + theme.colorPrimary,
	borderRadius: '4px',
	width: '70vw',
	margin: '0 auto'
};

const Title = styled.h1`
	font-size: 1em;
	font-weight: normal;
	text-align: center;
`;

const CatalogContainer = styled.table`
	margin-top: 12px;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	border-collapse: collapse;
`;

const CatalogRow = styled.tr`
`;
const CatalogCell = styled.td`
	-webkit-appearance: none;
	position: relative;
	width: ${100 / N_CELL_PER_ROW}%;
	opacity: 0.8;
	outline: none;
	cursor: pointer;

	
	&:after {
		content: '';
		display: block;
		margin-top: 100%;
	}
	
	&:hover, &:focus, &:active {
		opacity: 1;
		transition: opacity 0.5s;
		webkit-transition: opacity 0.5s;
	}
`;

const CatalogItem = styled.div`	
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: url(${props=> props.background}) no-repeat;
	background-size: cover;
`;

const CatalogItemTitle = styled.h2`
	margin: 4px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 2.7vmax;
	user-select: none;
	color: ${theme.colorInverse};
`;

const cities = [
	{
		name: "Monaco",
		image: monacoImg
	},
	{
		name: "Paris",
		image: monacoImg
	},
	{
		name: "Moscow",
		image: monacoImg
	},
	{
		name: "Denver",
		image: monacoImg
	},
	{
		name: "Tokyo",
		image: monacoImg
	},
	{
		name: "Berlin",
		image: monacoImg
	}
];

const getRows = (onClickCell, cities) => {
	const ret = [];

	for (let i = 0; i < cities.length; i += N_CELL_PER_ROW) {
		const cells = [];
		for (let j = i; j < cities.length && j < i + N_CELL_PER_ROW; j++) {
			cells.push(
				<CatalogCell key={cities[j].name} onClick={() => onClickCell(cities[j].name)}>
					<CatalogItem background={cities[j].image}>
						<CatalogItemTitle>{cities[j].name}</CatalogItemTitle>
					</CatalogItem>
				</CatalogCell>
			);
		}
		ret.push(<CatalogRow key={i}>{cells}</CatalogRow>);
	}

	return ret;
};

//TODO:
// - cities should be fetched in db

class CityCatalogPage extends React.Component{
	state = {
		cities : cities,
		filteredCities : cities
	};

	onClickLocation = (city) => {
		const passHandler = new PassInputsHandler();
		city = city.toLocaleLowerCase();
		this.props.history.push('/' + city);
		passHandler.saveCity(city);
	};

	onChangeSearchBar = (event) => {
		const value = event.target.value.toLocaleLowerCase();
		const newCities = this.state.cities.filter(city => city.name.toLocaleLowerCase().includes(value));
		console.log(newCities);
		this.setState({filteredCities: newCities});
	};

	render() {
		return (
			<div className={"CityCatalogPage"}>
				<AppBar title={"Vuego"}/>
				<Title>{"Planifier votre séjour dès maintenant"}</Title>
				<SearchBar
					style={searchBarStyle}
					placeholder={"Rechercher une destination"}
					onChange={this.onChangeSearchBar}
				/>
				<CatalogContainer>
					<tbody>
					{getRows(this.onClickLocation, this.state.filteredCities)}
					</tbody>
				</CatalogContainer>

			</div>
		)
	}
}
export default CityCatalogPage;