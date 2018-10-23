import React from "react";
import BottomNavigationBar from "./BottomNavigationBar/BottomNavigationBar";
import styled from "styled-components";
import Button from "./Button/Button";
import theme from "../app/theme";

const ButtonBasket = styled(Button)`
	background-color: ${theme.colorYellow};
	position: fixed;
	bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 24px);
	left: 50%;
	transform: translateX(-50%);
	width: 80vw;
	font-size: 13px;
	max-width: 280px;
`;

const ButtonNextStep = (props) =>
	<ButtonBasket {...props}>
		{ props.children }
	</ButtonBasket>;

export default ButtonNextStep;