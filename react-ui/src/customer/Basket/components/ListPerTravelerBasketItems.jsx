import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { switchTravelerBasket } from "../basketActions";

import BasketItem from "./BasketItem";

const Traveler = styled.p``;

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
					<div key={`basket-row-${index}`}>
						<li>
							<div>
								<Traveler>{traveler.name}</Traveler>
								<input type="checkbox"
								       checked={this.props.travelersBasket[traveler.id] ? 'checked' : ''}
								       onClick={e => this.props.switchTravelerBasket(
									       traveler.id,
									       !this.props.travelersBasket[traveler.id]
								       )}
								/>
							</div>
						</li>
						<table>
							<tbody>
							{this.props.basket.items
								.filter(item => item.travelerId === traveler.id)
								.map((item, index) =>
									<BasketItem key={`per-traveler${traveler.id}-${index}`} item={item}/>
								)
							}
							</tbody>
						</table>
					</div>
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