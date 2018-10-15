import React from "react";
import { Query } from "react-apollo";
import {GET_ATTRACTION_BY_TYPE} from "../../queries";
import Error404 from "../../Error404";
import EnumAttractionType from "./EnumAttractionType";

class DestinationOffersSeeByTypeView extends React.Component {
	constructor(props) {
		super(props);
		const found = Object.values(EnumAttractionType).filter(
			type => type.value === this.props.type.toLocaleUpperCase()
		);
		this.attractionType = found.length === 0 ? null : found[0];
	}

	render() {
		if (!this.attractionType)
			return <Error404/>;
		return (
			<Query query={GET_ATTRACTION_BY_TYPE} variables={{ type: this.attractionType.value }}>
				{ ({ loading, error, data }) => {
					if (loading) return <p>Loading</p>;
					if (error) return <p>Error</p>;
					const attractions = data.getAttractionByType;
					return attractions.map(attraction =>
						<p key={ attraction.id }>{ attraction.name }</p>
					);
				}}
			</Query>
		);
	}
}

export default DestinationOffersSeeByTypeView;