import React from "react";

import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_ATTRACTION_BY_TYPE } from "../../queries";
import { addToBasket, removeFromBasket } from "../Basket/basketActions";

import OffersByType from "./components/OffersByType";
import VuegoMustDoPass from "./components/VuegoMustDoPass";
import EnumAttractionType from "./EnumAttractionType";


class DestinationOffersSeeAll extends React.Component {
	render() {
		return (
			<div>
				<VuegoMustDoPass/>
				{ Object.values(EnumAttractionType).map(attractionType => (
					<div key={attractionType.value}>
						<Query query={GET_ATTRACTION_BY_TYPE} variables={{ type: attractionType.value }}>
							{({ loading, error, data }) => {
								if (loading) return <p> Loading </p>;
								if (error) return <p> Error </p>;
								return <OffersByType type={ attractionType } attractions={data.getAttractionByType}/>;
							}}
						</Query>
					</div>
				))}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: item => dispatch(addToBasket(item)),
		onClickRemoveItem: item => dispatch(removeFromBasket(item)),
	});
};

export default connect(null, mapDispatchToProps)(DestinationOffersSeeAll);