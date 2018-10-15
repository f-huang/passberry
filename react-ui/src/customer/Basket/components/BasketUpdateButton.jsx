import React from "react";
import moment from "moment/moment";

import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { UPDATE_BASKET} from "../../../queries";
import { setBasketId } from "../basketActions";

import Button from "../../../component/Button/Button";

class BasketUpdateButton extends React.Component {
	render() {
		const variables = {
			variables: {
				input: {
					basketId: this.props.basket.id,
					lastUpdateTime: moment(this.props.basket.lastUpdateTime).format('YYYY-MM-DD hh:mm:ss'),
					items: this.props.basket.items ? this.props.basket.items.map(item => ({
						itemId: item.product.id,
						type: item.product.type,
						userId: item.travelerId,
						quantity: item.quantity,
					})) : [],
					userId: 1
				}
			}
		};
		return (
			<Mutation mutation={UPDATE_BASKET}
			          update={(cache, { data: { updateBasket } }) => {
				          this.props.onMutateSuccess(updateBasket.basket.id);
				          this.props.history.push('/payment');
			          }}
			>
				{(mutate) => { return (
					<div>
						<Button onClick={e => mutate(variables)}>
							{ "Valider" }
						</Button>
					</div>
				)}}
			</Mutation>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		basket: state.basket
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onMutateSuccess: (id) => dispatch(setBasketId({ id: id }))
	})
};


const withOptions = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withOptions(BasketUpdateButton));