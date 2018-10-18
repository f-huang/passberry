import React from "react";

import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_PASSES_BY_USER_ID } from "../../../queries";
import ListTickets from "../components/ticket/ListTickets";

class MyTicketsView extends React.Component {
	render() {
		return (
			<div>
				<Query query={GET_PASSES_BY_USER_ID} variables={{ userId: this.props.userId }}>
					{ ({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						const passes = data.getPassesByUserId.passes;
						const tickets = [].concat.apply([], passes.map(pass => pass.tickets));
						return (
							<div>
								<ListTickets tickets={ tickets.filter(ticket=> ticket.usedTime === null) }/>
								<ListTickets tickets={ tickets.filter(ticket=> ticket.usedTime !== null) }/>
							</div>
						);
					}}
				</Query>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: 1
	}
};


export default connect(mapStateToProps)(MyTicketsView);