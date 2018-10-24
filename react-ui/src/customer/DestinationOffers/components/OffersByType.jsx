import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import OfferMediumSized from "./OfferMediumSized";
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import theme from "../../../app/theme";
import EnumActivityType from "../EnumActivityType";
import Link from "../../../Link";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${theme.colorInverse};
	padding: 4px 8px 12px 8px;
	margin: 8px 0;
	width: 100%;
`;

const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BottomContainer = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
`;

const ListOffers = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-x: scroll;
`;

const ListItem = styled.li`
`;

const Type = styled.h3`
	font-size: 20px;
	font-weight: bold;
	margin: 4px;
`;

const SeeAllLink = styled(Link)`
	font-size: 13px;
	color: ${theme.colorPurple};
`;

class OffersByType extends React.Component {
	static propTypes = {
		type: PropTypes.shape({
			value: PropTypes.string.isRequired,
			display: PropTypes.string.isRequired
		}),
		activities: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		}))
	};

	static defaultProps = {
		type: EnumActivityType.ATTRACTION,
		activities: [{ id: 0, name: '' }]
	};

	render() {
		const search = `?type=${this.props.type.value.toLocaleLowerCase()}`;
		const activities = this.props.activities.map(activity => (
			<ListItem key={activity.id}>
				<Link to={{pathname: `/activity/${activity.id}-${activity.name}`, search}}>
					<OfferMediumSized
						offer={activity}/>
				</Link>
			</ListItem>
		));
		return (
			<Container>
				<TopContainer>
					<Type>{this.props.type.display}</Type>
					<SeeAllLink to={{pathname: `/${this.props.destination}`, search}}>{"Voir tout"}</SeeAllLink>
				</TopContainer>
				<BottomContainer>
					<ListOffers>
						{activities}
					</ListOffers>
				</BottomContainer>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		destination: state.travelDetails.destination
	});
};

export default withRouter(connect(mapStateToProps)(OffersByType));