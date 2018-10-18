import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_white.svg";
import theme from "../../app/theme";
import { NavLink } from "react-router-dom";
import ActionBarContainer from "./ActionBarContainer";

const Icon = styled.img`
	width: 20px;
	height: 20px;
`;

const Title = styled.h3`
	font-size: 18px;
	color: ${theme.colorInverse};
	margin: 0;
	padding: 0 8px;
`;

const DestinationActionBar = (props) =>
	<ActionBarContainer>
		<NavLink to={props.to}>
			<Icon src={backIcon} alt="back-arrow"/>
		</NavLink>
		<Title>{ props.title }</Title>
	</ActionBarContainer>
;


DestinationActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default DestinationActionBar;