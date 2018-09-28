import React from "react";

import BackActionBar from "../../component/ActionBar/BackActionBar";
import PaymentButton from "./PaymentButton";


class PaymentView extends React.Component {
	render() {
		return (
			<div>
				<BackActionBar to={'/basket'} title={'Paiement'}/>
				<PaymentButton/>
			</div>
		)
	}
}

export default (PaymentView);