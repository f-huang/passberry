import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { showMoreDescription } from "../activityActions";
import theme from "../../../app/theme";

const Description = styled.p`
	margin: 0;
`;

const SeeMore = styled.span`
	font-size: 13px;
	font-weight: bold;
	margin-left: 4px;
	color: ${theme.colorPurple};	
`;


const MAX_CHAR = 150;

const ActivityDescription = ({ description, showMore, onClickShowMore }) =>
	<div>
		<Description>
			{ showMore ? description : description.substring(0, MAX_CHAR) + '...'  }
			{ !showMore && <SeeMore onClick={onClickShowMore}>{"Voir plus"}</SeeMore>}
		</Description>
	</div>;

ActivityDescription.propTypes = {
	description: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return ({
		showMore: state.activityPage.showMoreDescription
	});
};

const mapDispatchToProps = dispatch => ({
	onClickShowMore: () => dispatch(showMoreDescription())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDescription);