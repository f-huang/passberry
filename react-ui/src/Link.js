import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "./app/theme";

const StyledLink = styled(NavLink)`
	text-decoration: none;
	color: ${theme.textColor};
	
	&:link, &:visited, &:hover, &:focus, &:active {
		cursor: pointer;
		text-decoration: none;
	}
`;

const Link = props => <StyledLink {...props}/>;

export default Link;