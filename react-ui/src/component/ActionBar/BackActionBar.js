import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_white.svg";
import theme from "../../app/theme";
import { NavLink } from "react-router-dom";

const Bar = styled.div`
	background-color: ${theme.colorPrimary};
	height: 7vh;
	width: 100%;
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
const Title = styled.h1`
	font-size: 18px;
	color: ${theme.colorInverse};
	margin: 0;
	padding: 0 8px;
`;

const BackActionBar = (props) =>
	<Bar>
		<Container>
			<NavLink to={props.to}>
				<Icon src={backIcon} alt="back-arrow"/>
			</NavLink>
			<Title>{props.title}</Title>
		</Container>
	</Bar>;


BackActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string
};

export default BackActionBar;