import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_white.svg";
import theme from "../../app/theme";
import { NavLink } from "react-router-dom";

const Bar = styled.div`
	height: 7vh;
	width: 100%;
	position: relative;
	background-color: ${theme.colorPrimary};
`;

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 12px;
`;

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
	<Bar>
		<Container>
			<NavLink to={props.to}>
				<Icon src={backIcon} alt="back-arrow"/>
			</NavLink>
			<Title>{ props.title }</Title>
		</Container>
	</Bar>;


DestinationActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default DestinationActionBar;