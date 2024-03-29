import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/back_white.svg";
import { NavLink } from "react-router-dom";
import ActionBarContainer from "./ActionBarContainer";

const Root = styled(ActionBarContainer)`
	z-index: 1;	
	position: fixed;
	top: 0;
	left: 0;
	background-color: transparent;
`;

const Icon = styled.img`
	width: 20px;
	height: 20px;
`;

const TransparentActionBar = ({ to, onBackClick }) =>
	<Root>
			{to ?
				<NavLink to={to}>
					<Icon src={backIcon} alt="back-arrow"/>
				</NavLink>
				:
				<Icon src={backIcon} alt="back-arrow" onClick={onBackClick}/>
			}
	</Root>;


TransparentActionBar.propTypes = {
	to: PropTypes.string,
	onBackClick: PropTypes.func,
	title: PropTypes.string
};

export default TransparentActionBar;