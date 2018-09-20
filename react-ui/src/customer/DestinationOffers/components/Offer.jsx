import React from "react";
import styled from "styled-components";

import monacoImg from "../../../assets/monaco.jpg";
import defaultImg from "../../../assets/default-image.png";

const Container = styled.div`
	overflow: hidden;
	border-radius: 20px;
	background: url(${props => props.backgroundImage ? props.backgroundImage : defaultImg}) no-repeat;
	background-size: cover;
	height: 18vh;
	width: calc(100% / 4);
`;

const Name = styled.h2`
	font-size: 0.8em;
	font-weight: bold;
`;

const Offer = ({offer, onClick}) => {
	return (
		<Container onClick={onClick} backgroundImage={monacoImg}>
			<Name>{offer.name}</Name>
		</Container>
	);
};
//
// const mapStateToProps = (state, { index }) => {
// 	return ({
// 		// offer: state.destinationOffers.attractions[index]
// 	});
// };

export default Offer;