import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { hideView } from "./ticketQuantityActions";
import { addToBasket, removeFromBasket } from "../Basket/basketActions";

import Button from "../../component/Button/Button";
import theme from "../../app/theme";

const Background = styled.div`
	display: ${props => props.isShowing ? 'block' : 'none'};
	position: fixed;
	top: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 3;
	width: 100vw;
	height: 100vh;
`;

const Container = styled.div`
	position: fixed;
	overflow: hidden;
	z-index: 4;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
	background-color: ${theme.colorInverse};
	border: 1px solid ${theme.borderColor};
	border-radius: 6px;
	box-shadow: 0 2px 10px #000;
	flex-direction: column;
	width: 80vw;
	min-height: 280px;
	max-height: 400px;
	max-width: 300px;
`;

const TravelerView = styled.table`
	border-collapse: separate;
	border-spacing: 4px;
	vertical-align: middle;
	width: 100%;
	padding: 16px;
`;

const ButtonAddMinus = styled(Button)`
	box-shadow: 0 0 0;
	color: ${theme.borderColor};
	background-color: ${theme.colorInverse};
	border: 1px solid ${theme.borderColor};
	border-radius: 50%;
	font-size: 10px;
	text-align: center;
	padding: 0;
	width: 20px;
	height: 20px;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	padding: 8px 0;
`;

const SelectorContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const ButtonClose = styled(Button)`
	position: absolute;
	bottom: 0;
	margin: 12px auto 0 auto;
	background-color: ${theme.colorDarkBlue};
	border-color: ${theme.colorDarkBlue};
	font-size: 12px;
	width: 100%;
	min-height: 48px;
	border-radius: 0;
`;

const Quantity = styled.span`
	font-size: 12px;
	font-weight: bold;
`;

const Name = styled.span`
	font-size: 14px;
`;

const propTypes = {
	product: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};


class TicketQuantity extends React.Component {
	constructor(props) {
		super(props);
		this.closeView = this.closeView.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	closeView = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.onClickClose();
	};

	addItem = (e, travelerId) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.onClickAddItem(this.props.product, travelerId)
	};

	removeItem = (e, travelerId) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.onClickRemoveItem(this.props.product, travelerId)
	};

	render() {
		return (
			<Background isShowing={this.props.isShowing}>
				<Container>
					<Title>{"Attribuer les tickets"}</Title>
					<TravelerView >
						<tbody> {
							this.props.travelers.map((traveler, index) => {
								const travelerItemState = this.props.basket.items ? this.props.basket.items.find(item => {
										return item.travelerId === traveler.id &&
											item.product.id === this.props.product.id
									}
								) : null;
								return <tr key={index}>
									<td colSpan="3"><Name>{traveler.name}</Name></td>
									<td colSpan="1">
										<SelectorContainer>
											<ButtonAddMinus onClick={(e) => this.removeItem(e, traveler.id) }>-</ButtonAddMinus>
											<Quantity>{travelerItemState ? travelerItemState.quantity : 0}</Quantity>
											<ButtonAddMinus onClick={(e) => this.addItem(e, traveler.id) }>+</ButtonAddMinus>
										</SelectorContainer>
									</td>
								</tr>;
							})
						}</tbody>
					</TravelerView>
					<ButtonClose onClick={this.closeView}>{"Ok"}</ButtonClose>
				</Container>
			</Background>
		)
	}
}

TicketQuantity.propTypes = propTypes;

const mapStateToProps = state => {
	return ({
		travelers: state.travelDetails.travelers,
		basket: state.basket,
		isShowing: state.ticketQuantity.isShowing
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: (product, travelerId) => dispatch(addToBasket({
			quantity: 1,
			travelerId: travelerId,
			product: product,
		})),
		onClickRemoveItem: (product, travelerId) => dispatch(removeFromBasket({
			travelerId: travelerId,
			product: product,
		})),
		onClickClose: () => dispatch(hideView())
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketQuantity);