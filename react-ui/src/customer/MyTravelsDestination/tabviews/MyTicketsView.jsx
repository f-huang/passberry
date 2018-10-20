import React from "react";
import styled from "styled-components";
import qs from "query-string";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { GET_PASSES_BY_USER_ID } from "../../../queries";
import ListTickets from "../components/ticket/ListTickets";
import Error404 from "../../../Error404";

const Root = styled.div`
	width: 100vw;
`;

class MyTicketsView extends React.Component {
	render() {
		return (
			<Root>
				<Query query={GET_PASSES_BY_USER_ID} variables={{ userId: this.props.userId }}>
					{ ({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						const passes = data.getPassesByUserId.passes;
						if (!passes || passes.length === 0)
							return <Error404/>;
						const tickets = [].concat.apply([], passes.map(pass => pass.tickets));
						return (
							<div>
								<ListTickets tickets={ tickets.filter(ticket=> ticket.usedTime === null) }/>
								<ListTickets tickets={ tickets.filter(ticket=> ticket.usedTime !== null) }/>
							</div>
						);
					}}
				</Query>
			</Root>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: 1
	}
};


export default connect(mapStateToProps)(MyTicketsView);