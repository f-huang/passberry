import React from "react";

import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_ACTIVITIES_BY_TYPE } from "../../queries";
import { addToBasket, removeFromBasket } from "../Basket/basketActions";

import OffersByType from "./components/OffersByType";
import VuegoMustDoPass from "./components/VuegoMustDoPass";
import EnumActivityType from "./EnumActivityType";


class DestinationOffersSeeAll extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.activities && nextProps.activities && nextProps.activities.length === this.props.activities.length)
			return false;
		return true;
	}

	render() {
		return (
			<div>
				<VuegoMustDoPass/>
				{Object.values(EnumActivityType).map(attractionType => {
					const activities = this.props.activities && this.props.activities.filter(activity => activity.type === attractionType.value);
					if (!this.props.activities || this.props.activities.length === 0)
						return <div key={attractionType.value}>
							<Query query={GET_ACTIVITIES_BY_TYPE} variables={{type: attractionType.value}}>
								{({loading, error, data}) => {
									if (loading) return <p> Loading </p>;
									if (error) return <p> Error </p>;
									const activities = data.getActivitiesByType;
									return activities && activities.length > 0 ?
										<OffersByType type={attractionType} activities={data.getActivitiesByType}/> : "";
								}}
							</Query>
						</div>;
					else
						return (
							<div key={attractionType.value}>
								{
									activities && activities.length !== 0 ?
										<OffersByType type={attractionType} activities={activities}/> : ""
								}
							</div>
						);
				})
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activities: state.activities
});

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: item => dispatch(addToBasket(item)),
		onClickRemoveItem: item => dispatch(removeFromBasket(item)),
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffersSeeAll);