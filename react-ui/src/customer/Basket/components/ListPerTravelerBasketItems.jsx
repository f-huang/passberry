import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import {switchTravelerBasket, switchTravelerIsShowing} from "../basketActions";

import ListBasketItems from "./ListBasketItems";
import BasketCheckbox from "./BasketCheckbox";
import theme from "../../../app/theme";

const TravelerRow = styled.div`
	margin-top: 24px;
	
	&:first-child {
		margin-top: 0;
	}
`;

const TravelerDetailsRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Traveler = styled.span`
	font-weight: bold;
	font-style: italic;
	font-size: 13px;
`;

const Arrow = styled.i`
	border: solid ${theme.borderColor};
	border-width: 0 2px 2px 0;
	display: block;
	height: 8px;
	width: 8px;
	margin-right: 8px;
	transform: rotate(${props => props.degrees}deg);
`;

const TravelerArrowWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;



class ListPerTravelerBasketItems extends React.Component {
	constructor(props) {
		super(props);

		props.travelers.forEach(traveler => {
			props.switchTravelerBasket(traveler.id, true);
		});
	}

	render() {
		return (
			<ul>
				{this.props.travelers.map((traveler, index) => (
					this.props.basket.items.find(item => item.travelerId === traveler.id && item.quantity > 0) &&
					<TravelerRow key={`basket-row-${index}`}>
						<li>
							<TravelerDetailsRow>
								<TravelerArrowWrapper>
									<Arrow onClick={() => this.props.switchTravelerIsShowing(index)}
									       degrees={this.props.travelerIsShowing[index] ? -45 : 45}/>
									<Traveler>{traveler.firstName}</Traveler>
								</TravelerArrowWrapper>
								<BasketCheckbox
									checked={this.props.travelersBasket[traveler.id] ? 'checked' : ''}
									onClick={e => this.props.switchTravelerBasket(
										traveler.id,
										!this.props.travelersBasket[traveler.id]
									)}
								/>
							</TravelerDetailsRow>
						</li>
						{ this.props.travelerIsShowing[index] ?
							<ListBasketItems items={this.props.basket.items.filter(item => item.travelerId === traveler.id && item.quantity > 0)}/> : ""
						}
					</TravelerRow>
				))}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	const ids = state.travelDetails.travelers.map(traveler => traveler.id);
	return ({
		basket: {...state.basket, items: state.basket.items.filter(item => ids.includes(item.travelerId))},
		travelers: state.travelDetails.travelers,
		travelersBasket: state.basketPage.travelers,
		travelerIsShowing: state.basketPage.travelerIsShowing
	});
};

const mapDispatchToProps = dispatch => {
	return ({
		switchTravelerBasket: (travelerId, value) => dispatch(switchTravelerBasket({ [travelerId]: value })),
		switchTravelerIsShowing: (index) => dispatch(switchTravelerIsShowing(index))
	});
};


export default connect(mapStateToProps, mapDispatchToProps)(ListPerTravelerBasketItems);