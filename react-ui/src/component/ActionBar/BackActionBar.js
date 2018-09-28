import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_black.svg";
import {NavLink} from "react-router-dom";

const Bar = styled.div`
	height: 7vh;
	width: 100%;
`;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 12px;
`;

const Icon = styled.img`
	width: 24px;
	height: 24px;
`;
const Title = styled.h1`
	font-size: 4vmin;
	margin: 0 16px;
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