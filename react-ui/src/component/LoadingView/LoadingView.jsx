import React from "react";
import styled from "styled-components";
import theme from "../../app/theme";
import { blink, wave } from "./KeyFrames";

const Root = styled.div`
	position: absolute;
	z-index: 1;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background-color: ${theme.colorInverse};
	width: 100px;
	height: 100px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;


const Dot = styled.span`
	font-size: 24px;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: ${theme.colorLightBlue};
	margin: 2px;
	animation: ${blink} 1.4s both infinite, ${wave} 1.4s linear infinite;
	
	&:nth-child(1) {
		animation-delay: -1s;
	},
	&:nth-child(2) {
		animation-delay: -.8s;
	},
	&:nth-child(3) {
		animation-delay: -.6s;
	}
`;

const LoadingView = () => (
	<Root>
		<Dot/>
		<Dot/>
		<Dot/>
	</Root>
);

export default (LoadingView);
