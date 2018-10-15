import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { hideView } from "./ticketQuantityActions";
import { addToBasket, removeFromBasket } from "../Basket/basketActions";

import Button from "../../component/Button/Button";
import theme from "../../app/theme";

const Container = styled.div`
	display: ${props => props.isShowing ? 'flex' : 'none'};
	position: fixed;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
	background-color: ${theme.colorInverse};
	border: 1px solid ${theme.borderColor};
	box-shadow: 0 0 0 99999px rgba(0, 0, 0, .3);
	flex-direction: column;
	width: 80vw;
	max-height: 400px
`;

const TravelerView = styled.table`
`;

const ButtonAddMinus = styled(Button)`
	background-color: ${theme.colorInverse};
	color: ${theme.textColor};
	border: 1px solid ${theme.borderColor};
	border-radius: 4px;
	padding: 0;
	width: 48px;
	height: 48px;
`;

const Title = styled.div`
	font-size: 14px;
	text-align: center;
	padding: 8px 0;
	background-color: ${theme.colorDarkBlue};
	color: ${theme.colorInverse};
	border: 1px solid ${theme.borderColor};
`;

const ButtonClose = styled(Button)`
	margin: 12px auto;
	background-color: ${theme.colorDarkBlue};
	border-color: ${theme.colorDarkBlue};
	font-size: 12px;
	width: 30%;
	max-width: 100px;
`;

const Quantity = styled.span`
	font-size: 12px;
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
			<Container isShowing={this.props.isShowing}>
				<Title>{"Combien de tickets ?"}</Title>
				<TravelerView >
					<tbody>
					{
						this.props.travelers.map((traveler, index) => {
							const travelerItemState = this.props.basket.items ? this.props.basket.items.find(item => {
									return item.travelerId === traveler.id &&
										item.product.id === this.props.product.id
								}
							) : null;
							return (
								<tr key={index}>
									<td><Name>{traveler.name}</Name></td>
									<td>
										<ButtonAddMinus onClick={(e) => this.removeItem(e, traveler.id) }>-</ButtonAddMinus>
									</td>
									<td>
										<Quantity>{travelerItemState ? travelerItemState.quantity : 0}</Quantity>
									</td>
									<td>
										<ButtonAddMinus onClick={(e) => this.addItem(e, traveler.id) }>+</ButtonAddMinus>
									</td>
								</tr>
							);
						})
					}
					</tbody>
				</TravelerView>
				<ButtonClose onClick={this.closeView}>{"Ok"}</ButtonClose>
			</Container>
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