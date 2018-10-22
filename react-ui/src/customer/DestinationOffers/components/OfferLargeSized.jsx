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
	position: relative;
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
	position: relative;
	overflow: hidden;
	padding: 8px;
	user-select: none;
`;

const ButtonAdd = styled(Button)`
	background-color: ${theme.colorPurple};
	border-color: ${theme.colorPurple};
	border-radius: 6px;
	position: absolute;
	z-index: 1;
	top: 50%;
	right: 16px;
	padding: 12px 8px;
	transform: translateY(-50%);
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

const onClickAdd = (event, id, onClickShowView) => {
	event.preventDefault();
	event.stopPropagation();
	event.nativeEvent.stopImmediatePropagation();
	onClickShowView(id);
};

const OfferLargeSized = ({ offer, onClick, onClickShowView }) => {
	const image = offer.images && offer.images.length > 0 ? offer.images[0] : monacoImg;
	return (
		<Container onClick={onClick}>
			{ <TicketQuantity id={offer.id} product={offer}/> }
			<TopContainer backgroundImage={image}/>
			<BottomContainer >
				<Name><b>{offer.name}</b></Name>
				<Price>{`Tarif adulte : ${offer.price.adult.toFixed(2)}€`}</Price>
				<ButtonAdd onClick={e => onClickAdd(e, offer.id, onClickShowView)}>
					{"Ajouter"}
				</ButtonAdd>
			</BottomContainer>
		</Container>
	);
};


const mapDispatchToProps = (dispatch) => {
	return ({
		onClickShowView: (id) => { dispatch(showView(id)) }
	});
};

export default connect(null, mapDispatchToProps)(OfferLargeSized);