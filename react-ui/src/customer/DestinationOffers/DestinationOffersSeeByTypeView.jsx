import React from "react";
import qs from "query-string";
import { Query } from "react-apollo";
import { withRouter} from "react-router-dom";
import { GET_ATTRACTIONS_BY_TYPE } from "../../queries";
import Error404 from "../../Error404";
import EnumAttractionType from "./EnumAttractionType";
import OfferLargeSized from "./components/OfferLargeSized";
import Link from "../../Link";

class DestinationOffersSeeByTypeView extends React.Component {
	constructor(props) {
		super(props);
		const found = Object.values(EnumAttractionType).filter(
			type => type.value === this.props.type.toLocaleUpperCase()
		);
		this.attractionType = found.length === 0 ? null : found[0];
		this.onAttractionClick = this.onAttractionClick.bind(this);
	}

	onAttractionClick = (attraction) => {

	};

	render() {
		const params = qs.parse(this.props.location.search);
		if (!this.attractionType)
			return <Error404/>;
		return (
			<Query query={GET_ATTRACTIONS_BY_TYPE} variables={{ type: this.attractionType.value }}>
				{ ({ loading, error, data }) => {
					if (loading) return <p>Loading</p>;
					if (error) return <p>Error</p>;
					const attractions = data.getAttractionsByType;
					return attractions.map(attraction =>
						<Link to={{pathname:  `/attraction/${attraction.id}-${attraction.name}`, search: `?type=${params.type}`}}>
							<OfferLargeSized key={attraction.id}
							                 offer={attraction}
							/>
						</Link>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(DestinationOffersSeeByTypeView);