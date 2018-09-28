import React from "react";
import { connect } from "react-redux";
import Button from "../../component/Button/Button";

class PaymentView extends React.Component {
	render() {
		return (
			<div>
				<Button value={`Payer €${this.props.total}`}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		total: state.basket.items.reduce((previous, current) =>
			(previous.product.price.adult * previous.quantity) +
			(current.product.price.adult * current.quantity)).toFixed(2)
	})
};

export default connect(mapStateToProps)(PaymentView);