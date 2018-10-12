import React from "react";
import { connect } from "react-redux";
import { Query, graphql, compose } from "react-apollo";
import {GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID} from "../queries";

class ScannedProfileView extends React.Component {
	render() {
		const traveler = this.props.traveler;
		console.log(this.props.traveler.id, this.props.attractionId);
		return (
			<div>
				Scanned Profile
				<div>
					{traveler.firstName}
					{traveler.lastName}
				</div>
				<Query query={GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID}
				       variables={{ travelerId: this.props.traveler.id, attractionId: this.props.attractionId }}>
					{ ({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						const ticket = data.getTicketByTravelerIdAndAttractionId;
						if (ticket === null || ticket === undefined)
							return <p>Ticket not found</p>;
						else if (ticket && ticket.usedTime !== null)
							return <p>Ticket already used</p>;
						else
							return <p>{ticket.id} @ {ticket.attractionId}</p>
					}}
				</Query>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return ({
		traveler: state.scan.traveler,
		attractionId: 1,
		userId: 10
	})
};

const mapPropsToOptions = ({ travelerId,  attractionId }) => ({
	variables: {
		travelerId,
		attractionId
	},
	name: 'ticket',
});

const withOptions = compose(
	// graphql(GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID, {
	// 	options: mapPropsToOptions
	// }),
	connect(mapStateToProps)
);

export default withOptions(ScannedProfileView);