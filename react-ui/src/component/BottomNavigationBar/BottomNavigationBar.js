import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import theme from "../../app/theme";

//ICONS
import iconTrip from "../../assets/icons/world_black.svg";
import iconTripSelected from "../../assets/icons/world_black.svg";
import iconWishList from "../../assets/icons/heart_black.svg";
import iconWishListSelected from "../../assets/icons/heart_black.svg";
import iconQR from "../../assets/icons/qr-empty.svg";
import iconQRSelected from "../../assets/icons/qr-full.svg";
import iconProfile from "../../assets/icons/user_black.svg";
import iconProfileSelected from "../../assets/icons/profile-full.svg";
import iconParameters from "../../assets/icons/gears_black.svg";
import iconParametersSelected from "../../assets/icons/gears_black.svg";


//ITEM
import BottomNavigationItem from "./BottomNavigationBarItem";


const BottomNavContainer = styled.div`
	width: 100vw;
	height: ${props => props.height};
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	position: fixed;
	color: #000000;
	font-size: 1em;
	bottom: 0;
	z-index: 4;
	border-top: 1px solid ${theme.colorPrimary}
`;

const MiddleButton = styled.div`
	position: absolute;
	left: 50%;
	top: -1vh;
	transform: translateX(-50%);
	border-radius: 50%;
	border-top: 1px solid ${theme.colorYellow};
	z-index: 5;
	background-color: ${theme.colorInverse};
	width: ${props => 100/ props.numberOfBtns}vw;
	height:  ${props => 100/ props.numberOfBtns}vw;
`;


class BottomNavigationBar extends React.Component {
	static items = {
		currentTrip: "Mes voyages",
		mySelections: "Mes sélections ",
		qr: "QRPage",
		profile: "Profil",
		parameters: "Paramètres",
	};

	static propTypes = {
		itemSelected: PropTypes.string.isRequired,
		onMount: PropTypes.func
	};
	static BOTTOM_BAR_HEIGHT = '48px';

	navigationBtns = [
		{
			name: BottomNavigationBar.items.currentTrip,
			alt: "trip-icon",
			location: "/my-travels",
			icon: iconTrip,
			iconSelected: iconTripSelected
		},
		{
			name: BottomNavigationBar.items.mySelections,
			alt: "selections-icon",
			location: "/selections",
			icon: iconWishList,
			iconSelected: iconWishListSelected
		},
		{
			name: BottomNavigationBar.items.qr,
			alt: "qr-code-icon",
			location: "/qr",
			icon: iconQR,
			iconSelected: iconQRSelected
		},
		{
			name: BottomNavigationBar.items.profile,
			alt: "profile-icon",
			location: "/profile",
			icon: iconProfile,
			iconSelected: iconProfileSelected
		},
		{
			name: BottomNavigationBar.items.parameters,
			alt: "parameters-icon",
			location: "/parameters",
			icon: iconParameters,
			iconSelected: iconParametersSelected
		},
	];
	constructor(props) {
		super(props);
		this.changePage = this.changePage.bind(this);
	}

	componentDidMount() {
		if (this.props.onMount)
			this.props.onMount(this.navElement.clientHeight);
	}

	changePage(e, location) {
		if (this.props.location.pathname === location)
			return ;
		e.preventDefault();
		this.props.history.push(location);
	}

	render() {

		return (
			<BottomNavContainer height={BottomNavigationBar.BOTTOM_BAR_HEIGHT} innerRef={navElement => this.navElement = navElement}>
				<MiddleButton numberOfBtns={this.navigationBtns.length}/>
				{this.navigationBtns.map((item, i) =>
					<BottomNavigationItem handleClick={this.changePage}
					                      numberOfItems={this.navigationBtns.length}
					                      history={this.props.history}
					                      item={item}
					                      key={i}
					                      isSelected={this.props.itemSelected === item.name}/>
				)}
			</BottomNavContainer>
		)
	};
}

export default withRouter(BottomNavigationBar);