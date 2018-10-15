import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { showView } from "../../TicketQuantity/ticketQuantityActions";

import monacoImg from "../../../assets/monaco.jpg";
import defaultImg from "../../../assets/default-image.png";
import theme from "../../../app/theme";
import Button from "../../../component/Button/Button";
import TicketQuantity from "../../TicketQuantity/TicketQuantity";

const Container = styled.div`
	display: block;
	box-shadow: 0px 0px 1px 1px ${theme.lightGrey};
	overflow: hidden;
	margin: 16px auto;
	border-radius: 6px;
	width: 95vw;
	max-width: 880px;
`;

const TopContainer = styled.div`
	position: relative;
	background: url(${props => props.backgroundImage ? props.backgroundImage : defaultImg}) no-repeat;
	background-size: cover;
	overflow: hidden;
	height: 18vh;
	max-height: 400px;
	width: 100%;
`;

const BottomContainer = styled.div`
	overflow: hidden;
	padding: 8px;
	user-select: none;
`;

const ButtonAdd = styled(Button)`
	position: absolute;
	z-index: 1;
	top: 8px
	right: 8px;
	width: 24px;
	height: 24px;
	padding: 0;
	border-radius: 50%;
`;

const Name = styled.h2`
	margin: 0;
	font-weight: bold;
	font-size: 14px;
	text-align: start;
	user-select: none;
`;

const Price = styled.span`
	font-size: 10px;	
`;

const onClickAdd = (event, onClickShowView) => {
	event.stopPropagation();
	onClickShowView();
};

const OfferLargeSized = ({offer, onClick, onClickShowView}) => {
	const image = offer.images && offer.images.length > 0 ? offer.images[0] : monacoImg;
	return (
		<Container onClick={onClick} >
			<TopContainer backgroundImage={image}>
				<ButtonAdd onClick={e => onClickAdd(e, onClickShowView)}>
					+
				</ButtonAdd>
				<TicketQuantity product={offer}/>
			</TopContainer>
			<BottomContainer>
				<Name><b>{offer.name}</b></Name>
				<Price>{`Tarif adulte : ${offer.price.adult.toFixed(2)}€`}</Price>
			</BottomContainer>
		</Container>
	);
};

const mapDispatchToProps = dispatch => {
	return ({
		onClickShowView: () => dispatch(showView())
	});
};

export default connect(null, mapDispatchToProps)(OfferLargeSized);