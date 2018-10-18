import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_white.svg";
import { NavLink } from "react-router-dom";
import ActionBarContainer from "./ActionBarContainer";

const Root = styled(ActionBarContainer)`
	position: fixed;
	top: 0;
	left: 0;
	background-color: transparent;
`;

const Icon = styled.img`
	width: 20px;
	height: 20px;
`;

const BackActionBar = ({ to, onBackClick }) =>
	<Root>
			{to ?
				<NavLink to={to}>
					<Icon src={backIcon} alt="back-arrow"/>
				</NavLink>
				:
				<Icon src={backIcon} alt="back-arrow" onClick={onBackClick}/>
			}
	</Root>;


BackActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	title: PropTypes.string
};

export default BackActionBar;