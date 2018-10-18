import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import OfferMediumSized from "./OfferMediumSized";
import { NavLink, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import theme from "../../../app/theme";
import EnumAttractionType from "../EnumAttractionType";

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
	cursor: pointer;
`;

const Type = styled.h3`
	font-size: 20px;
	font-weight: bold;
	margin: 4px;
`;

const SeeAllLink = styled(NavLink)`
	font-size: 13px;
	color: ${theme.colorPurple};
`;

class OffersByType extends React.Component {
	static propTypes = {
		type: PropTypes.shape({
			value: PropTypes.string.isRequired,
			display: PropTypes.string.isRequired
		}),
		attractions: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		}))
	};

	static defaultProps = {
		type: EnumAttractionType.ATTRACTION,
		attractions: [{ id: 0, name: '' }]
	};

	render() {
		const search = `?type=${this.props.type.value.toLocaleLowerCase()}`;
		const attractions = this.props.attractions.map(attraction => (
			<ListItem key={attraction.id}>
				<NavLink to={{pathname: `/attraction/${attraction.id}-${attraction.name}`, search}}>
					<OfferMediumSized
						offer={attraction}/>
				</NavLink>
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
						{attractions}
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