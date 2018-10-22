import React from "react";
import qs from "query-string";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { withRouter} from "react-router-dom";
import { GET_ACTIVITIES_BY_TYPE } from "../../queries";
import Error404 from "../../Error404";
import EnumActivityType from "./EnumActivityType";
import OfferLargeSized from "./components/OfferLargeSized";
import Link from "../../Link";

class DestinationOffersSeeByTypeView extends React.Component {
	constructor(props) {
		super(props);
		const found = Object.values(EnumActivityType).filter(
			type => type.value === this.props.type.toLocaleUpperCase()
		);
		this.attractionType = found.length === 0 ? null : found[0];
	}

	render() {
		const params = qs.parse(this.props.location.search);
		if (!this.attractionType)
			return <Error404/>;
		let activities = this.props.activities && this.props.activities.filter(activity => activity.type === this.attractionType.value);
		return (
			<div>
				{(!this.props.activities || this.props.activities.length === 0) &&
				<Query query={GET_ACTIVITIES_BY_TYPE} variables={{ type: this.attractionType.value }}>
					{ ({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						activities = data.getActivitiesByType;
						return "";
					}}
				</Query>
				}
				{activities.map((activity, index) => {
					return (
						<Link key={activity.id}
						      to={{
							      pathname: `/activity/${activity.id}-${activity.name}`,
							      search: `?type=${params.type}`
						      }}
						>
							<OfferLargeSized offer={activity} index={index}/>
						</Link>
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


export default withRouter(connect(mapStateToProps)(DestinationOffersSeeByTypeView));