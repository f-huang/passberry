import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { withRouter} from "react-router-dom";
import { GET_VUEGO_PASS_MUST_DO} from "../../queries";
import OfferLargeSized from "./components/OfferLargeSized";
import Link from "../../Link";
import LoadingView from "../../component/LoadingView/LoadingView";
import BackActionBar from "../../component/ActionBar/BackActionBar";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import ButtonCurrentBasket from "./components/ButtonCurrentBasket";
import theme from "../../app/theme";

const Root = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${theme.backgroundColor};
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	overflow-y: scroll;
	padding-bottom: calc(${BottomNavigationBar.BOTTOM_BAR_HEIGHT} + 72px);
`;

class DestinationOffersSeeVuegoPass extends React.Component {
	render() {
		const destination = this.props.match.params.destination || { ...this.props };
		let activities = this.props.activities && this.props.activities.filter(activity => activity.mustDo);
		return (
			<Root>
				<div>
					<BackActionBar to={"/"} title={'Vuego Pass'}/>
				</div>
				{(!this.props.activities || this.props.activities.length === 0) &&
				<Query query={GET_VUEGO_PASS_MUST_DO}  variables={{ destination }} >
					{ ({ loading, error, data }) => {
						if (loading) return <LoadingView/>;
						if (error) return <p>Error</p>;
						activities = data.getActivitiesByType;
						return "";
					}}
				</Query>
				}
				<Container>
					{activities && activities.map((activity, index) =>
						<Link key={activity.id}
						      to={{
							      pathname: `/activity/${activity.id}-${activity.name}`,
							      search: `?type=pass`
						      }}
						>
							<OfferLargeSized offer={activity} index={index}/>
						</Link>
					)}
					<ButtonCurrentBasket/>
				</Container>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.currentTrip}/>
			</Root>
		);
	}
}

const mapStateToProps = state => ({
	activities: state.activities,
	destination: state.travelDetails.destination
});


export default withRouter(connect(mapStateToProps)(DestinationOffersSeeVuegoPass));