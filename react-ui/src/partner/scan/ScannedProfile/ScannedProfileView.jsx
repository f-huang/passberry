import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "../../../component/Button/Button";
import ValidateEntryButton from "./ValidateEntryButton";
import QueryTicketComponent from "./QueryTicketComponent";
import QueryTravelerComponent from "./QueryTravelerComponent";
import Traveler from "./Traveler";
import theme from "../../../app/theme";
import BackActionBar from "../../../component/ActionBar/BackActionBar";
import RefuseEntryButton from "./RefuseEntryButton";

const Root = styled.div`
	background-color: ${theme.backgroundColor};
	width: 100vw;
	min-height: 100vh;
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 24px;
`;

const ButtonsContainer = styled.div`
	position: absolute;
	bottom: 24px;
	left: 24px;
	right: 24px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;


class ScannedProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.scanId = this.props.match.params.scanId;
	}

	render() {
		const traveler = this.props.traveler;
		if (!traveler)
			return <QueryTravelerComponent scanId={this.scanId}/>;
		return (
			<Root>
				<BackActionBar to={`/scan-profile`} title={`Profil scanné`}/>
				<Container>
					<Traveler traveler={traveler} ticketPrice={this.props.ticket ? this.props.ticket.price : null}/>
					<QueryTicketComponent scanId={this.scanId}/>
					<ButtonsContainer>
						<RefuseEntryButton/>
						<ValidateEntryButton/>
					</ButtonsContainer>
				</Container>
			</Root>
		);
	}
}

const mapStateToProps = state => ({
	traveler: state.scan.traveler,
	ticket: state.scan.ticket
});

export default connect(mapStateToProps, null)(ScannedProfileView);