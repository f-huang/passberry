import React from "react";
import theme from "../../../app/theme";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import imgMonaco from "../../../assets/monaco.jpg";
import Link from "../../../Link";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${theme.colorInverse};
	padding: 4px 8px 12px 8px;
	margin: 8px 0;
	width: 100%;
`;

const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BottomContainer = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
`;

const Title = styled.h3`
	font-size: 20px;
	font-weight: bold;
	margin: 4px;
`;

const Preview = styled.div`
	position: relative;
	background: url(${props => props.backgroundImage ? props.backgroundImage : imgMonaco}) no-repeat;
	background-size: cover;
	border-radius: 6px;
	overflow: hidden;
	box-shadow: 0px 0px 1px 1px ${theme.lightGrey};
	height: 24vh;
	max-height: 400px;
	width: 100%;
	margin-right: 8px;
`;

const SeeAllLink = styled.a`
	font-size: 13px;
	color: ${theme.colorPurple};
`;

const MainText = styled.p`
	margin: 8px;
	font-size: 20px;
	color: ${theme.colorInverse};	
`;

const SecondaryText = styled.p`
	position: absolute;
	transform: translateY(50%);
	bottom: 8px;
	right: 8px
	font-size: 12px;
	color: ${theme.colorInverse};
`;

const VuegoMustDoPass = (props) => {
	const destination = props.match.params.destination.toLocaleLowerCase();
	return (
		<Container>
			<TopContainer>
				<Title>{"Les Vuego Pass"}</Title>
				<SeeAllLink href="#">{"Voir tout"}</SeeAllLink>
			</TopContainer>
			<BottomContainer>
				<Preview>
					<MainText><b>{"Tous les must-do de Monaco"}</b></MainText>
					<SecondaryText><b><i>{"à partir de 38€"}</i></b></SecondaryText>
				</Preview>
			</BottomContainer>
		</Container>
	);
};

export default withRouter(VuegoMustDoPass);
