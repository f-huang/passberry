import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";

const WIDTH = "25px";
const HEIGHT = "25px";

const Container = styled.label`
	-webkit-appearance: none; -moz-appearance: none; -webkit-user-select: none; -webkit-touch-callout: none;
	display: block;
	position: relative;
	width: ${WIDTH};
	height: ${HEIGHT};
	&:hover input ~ span{
		// background-color: #eee;
	},
`;

const Input = styled.input`
	height: 0;
	width: 0;
	
	&:checked ~ .styled-checkbox {
	},
	&:checked ~ .styled-checkbox:after {
		display: block;
	}
`;

const StyledInput = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	height: ${WIDTH};
	width: ${HEIGHT};
	border-radius: 50%;
	border: 1px solid ${theme.borderColor};
	background-color: ${theme.colorInverse};

	&:after {
		content: "";
		position: absolute;
		display: none;
		left: 9px;
		top: -8px;
		width: 12px;
		height: 28px;
		border: solid ${theme.colorPurple};
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`;

const BasketCheckbox = (props) =>
	<Container>
		<Input type="checkbox" {...props}/>
		<StyledInput className={"styled-checkbox"}/>
	</Container>;

export default BasketCheckbox;
