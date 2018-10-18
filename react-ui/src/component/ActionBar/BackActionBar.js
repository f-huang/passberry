import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/back_white.svg";
import theme from "../../app/theme";
import { NavLink } from "react-router-dom";
import ActionBarContainer from "./ActionBarContainer";

const Root = styled(ActionBarContainer)`
	background-color: ${theme.primaryColor};
`;

const Icon = styled.img`
	z-index: 1;
	width: 20px;
	height: 20px;
`;
const Title = styled.h1`
	font-size: 18px;
	color: ${theme.colorInverse};
	margin: 0;
	padding: 0 8px;
`;

const BackActionBar = (props) =>
	<Root>
			<NavLink to={props.to}>
				<Icon src={backIcon} alt="back-arrow"/>
			</NavLink>
			<Title>{props.title}</Title>
	</Root>
;


BackActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string
};

export default BackActionBar;