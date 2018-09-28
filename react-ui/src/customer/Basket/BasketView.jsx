import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import BackActionBar from "../../component/ActionBar/BackActionBar";
import Button from "../../component/Button/Button";

class BasketView extends React.Component {
	render() {
		return (
			<div>
				<BackActionBar to={'/' + (this.props.destination || "") } title={"Basket"}/>
				{ (this.props.basket.items) && this.props.basket.items.map((item, index) =>
					<div>
						<p key={index}>{item.product.name}</p>
						<p key={index}>{item.quantity}</p>
					</div>
				)}
				<NavLink to={'/payment'}>
					<Button value={"Valider mon panier"}/>
				</NavLink>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		destination: state.travelDetails.destination,
		basket: state.basket
	})
};

export default connect(mapStateToProps)(BasketView);