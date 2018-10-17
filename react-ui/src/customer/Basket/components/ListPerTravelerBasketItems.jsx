import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { switchTravelerBasket } from "../basketActions";

import ListBasketItems from "./ListBasketItems";

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
					this.props.basket.items.find(item => item.travelerId === traveler.id) &&
					<TravelerRow key={`basket-row-${index}`}>
						<li>
							<TravelerDetailsRow>
								<Traveler>{traveler.name}</Traveler>
								<input type="checkbox"
								       checked={this.props.travelersBasket[traveler.id] ? 'checked' : ''}
								       onClick={e => this.props.switchTravelerBasket(
									       traveler.id,
									       !this.props.travelersBasket[traveler.id]
								       )}
								/>
							</TravelerDetailsRow>
						</li>
						<ListBasketItems items={this.props.basket.items.filter(item => item.travelerId === traveler.id)}/>
					</TravelerRow>
				))}
			</ul>
		);
	}
}

const mapStateToProps = state => {
	return ({
		basket: state.basket,
		travelers: state.travelDetails.travelers,
		travelersBasket: state.basketPage.travelers
	});
};

const mapDispatchToProps = dispatch => {
	return ({
		switchTravelerBasket: (travelerId, value) => dispatch(switchTravelerBasket({ [travelerId]: value }))
	});
};


export default connect(mapStateToProps, mapDispatchToProps)(ListPerTravelerBasketItems);