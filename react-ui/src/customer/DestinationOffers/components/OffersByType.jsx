import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Offer from "./Offer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import theme from "../../../app/theme";

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
	overflow: hidden;
	justify-content: space-between;
	align-items: center;
`;

const BottomContainer = styled.div`
	display: flex;
	overflow: hidden;
`;

const Type = styled.h3`
	font-size: 20px;
	font-weight: bold;
	margin: 4px;
`;

const SeeAllLink = styled.a`
	font-size: 13px;
	color: ${theme.colorPurple};
`;

class OffersByType extends React.Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		attractions: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		}))
	};

	static defaultProps = {
		type: '',
		attractions: [{ id: 0, name: '' }]
	};

	render() {
		const attractions = this.props.attractions.map(attraction => (
			<Offer key={attraction.id}
			       offer={attraction}
			       onClick={(e) => this.props.history.push(`/attraction/${attraction.id}-${attraction.name}`)}/>
		));
		return (
			<Container>
				<TopContainer>
					<Type>{this.props.type}</Type>
					<SeeAllLink href={"/"}>{"Voir tout"}</SeeAllLink>
				</TopContainer>
				<BottomContainer>
					{attractions}
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