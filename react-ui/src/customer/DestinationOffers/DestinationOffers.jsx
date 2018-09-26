import React from "react";
import { connect } from "react-redux";
import BackSearchActionBar from "../../component/ActionBar/BackSearchActionBar";
import TravelRecap from "./components/TravelRecap.jsx";
import OffersByType from "./components/OffersByType";
import {addToBasket, removeFromBasket} from "./destinationOffersActions";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const getAttractionsByTypeQL = gql`
	query getAttractionByType($type: String!) {
	  getAttractionByType(type: $type) {
	    id
	    name
	    link
	    description
	    price {
	      adult
	      child
	      maxAgeForChild
	    }
	    type
	  }
	}
`;

class DestinationOffers extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			basket: props.basket || [],
			travelers: props.travelers || [],
			startDate: props.startDate || 0,
			endDate: props.endDate || 0,
		}
		//TODO:
		// if destination doesnt match
		// history.replace('/');
	}

	componentWillReceiveProps(props) {
		this.setState = ({
			basket: props.basket || this.state.basket,
			travelers: props.travelers || this.state.travelers,
			startDate: props.startDate || this.state.startDate,
			endDate: props.endDate || this.state.endDate
		});
	}

	render() {
		return (
			<div>
				<BackSearchActionBar to={'/'} onSearch={() => console.log("to")}/>
				<TravelRecap/>
				<Query query={getAttractionsByTypeQL} variables={{type: "ATTRACTION"}}>
					{({loading, error, data}) => {
						if (loading) return <p> Loading </p>;
						if (error) return <p> Error : </p>;
						return <OffersByType type={"Visites"} attractions={data.getAttractionByType}/>;
					}}
				</Query>
				<Query query={getAttractionsByTypeQL} variables={{type: "RESTAURANT"}}>
					{({loading, error, data}) => {
						if (loading) return <p> Loading </p>;
						if (error) return <p> Error : </p>;
						return <OffersByType type={"Restaurants"} attractions={data.getAttractionByType}/>;
					}}
				</Query>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		basket: state.basket,
	})
};

const mapDispatchToProps = (dispatch) => {
	return ({
		onClickAddItem: item => dispatch(addToBasket(item)),
		onClickRemoveItem: item => dispatch(removeFromBasket(item)),
	});
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationOffers);