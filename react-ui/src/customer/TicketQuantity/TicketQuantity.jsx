import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Button from "../../component/Button/Button";
import {addToBasket, removeFromBasket} from "../Basket/basketActions";

const Container = styled.div`
	display: ${props => props.isShowing ? 'flex' : 'none'};
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
		this.state = {
			isShowing: props.isShowing || false,
			basket: props.basket || {}
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			isShowing: props.isShowing !== undefined ? props.isShowing : this.state.isShowing,
			basket: props.basket || this.state.basket
		})
	}

	render() {
		return (
			<Container isShowing={this.state.isShowing}>
				{
					this.props.travelers.map((traveler, index) => {
						const travelerItemState = this.state.basket.items ? this.state.basket.items.find(item => {
							return item.travelerId === traveler.id &&
								item.product.id === this.props.product.id
							}
						) : null;
						return (
							<div key={index}>
								<div>{traveler.name}</div>
								<Button value={'-'} onClick={(e) => this.props.onClickRemoveItem(this.props.product, traveler.id)}/>
								<div>{travelerItemState ? travelerItemState.quantity : 0}</div>
								<Button value={'+'} onClick={(e) => this.props.onClickAddItem(this.props.product, traveler.id)}/>
							</div>
						);
					})
				}
			</Container>
		)
	}
}

TicketQuantity.propTypes = propTypes;

const mapStateToProps = state => {
	console.log(state.basket);
	return ({
		travelers: state.travelDetails.travelers,
		basket: state.basket
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
		}))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketQuantity);