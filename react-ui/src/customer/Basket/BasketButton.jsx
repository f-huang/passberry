import React from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { CREATE_BASKET } from "../../queries";
import moment from "moment/moment";
import Button from "../../component/Button/Button";
import {setBasketId} from "./basketActions";

class BasketButton extends React.Component {
	render() {
		const variables = {
			variables: {
				input : {
					initTime: moment(this.props.basket.initTime).format('YYYY-MM-DD hh:mm:ss'),
					lastUpdateTime: moment(this.props.basket.lastUpdateTime).format('YYYY-MM-DD hh:mm:ss'),
					items: this.props.basket.items ? this.props.basket.items.map(item =>
						({
							itemId: item.product.id,
							type: item.product.type,
							userId: item.travelerId,
							quantity: item.quantity,
						})
					) : []
				}
			}
		};
		return (
			<Mutation mutation={CREATE_BASKET}
			          update={(cache, { data: { createBasket } }) => {
				          this.props.onMutateSuccess(createBasket.basket.id);
				          this.props.history.push('/payment');
			          }}
			>
				{(mutate) => { return (
					<div>
						<Button onClick={e => mutate(variables)}/>
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

export default withRouter(withOptions(BasketButton));