import React from "react";
import styled from "styled-components";

import monacoImg from "../../../assets/monaco.jpg";
import defaultImg from "../../../assets/default-image.png";
import theme from "../../../app/theme";

const Container = styled.div`
	overflow: hidden;
	border-radius: 20px;
	background: url(${props => props.backgroundImage ? props.backgroundImage : defaultImg}) no-repeat;
	background-size: cover;
	box-shadow: 0px 0px 1px 1px ${theme.lightGrey};
	height: 18vh;
	width: calc(100% / 4);
	margin-right: 8px;
`;

const Name = styled.h2`
	font-size: 0.8em;
	font-weight: bold;
`;

const Offer = ({offer, onClick}) => {
	const image = offer.images && offer.images.length > 0 ? offer.images[0] : monacoImg;
	return (
		<Container onClick={onClick} backgroundImage={image}>
			<Name>{offer.name}</Name>
		</Container>
	);
};


export default Offer;