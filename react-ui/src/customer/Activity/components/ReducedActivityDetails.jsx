import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { switchDetailsAreShowing } from "../activityActions";
import { hideActivityKeyFrame } from "./KeyFrames";

import ActivityDetailsLayout from "./ActivityDetailsLayout";
import ShowHideArrow from "./ShowHideArrow";

const Root = styled(ActivityDetailsLayout)`
	height: 20vh;
	animation: ${hideActivityKeyFrame} 0.6s ease-in-out 0s;
`;

const Arrow = styled(ShowHideArrow)`
	transform: rotate(90deg) translate(0, 50%);
`;


const ReducedActivityDetails = ({ activity, onClick, onClickSwitchDetailsAreShowing }) => {
	return (
		<Root>
			<Arrow onClick={onClickSwitchDetailsAreShowing}/>
		</Root>
	)
};

ReducedActivityDetails.propTypes = {
	activity: PropTypes.shape({
		name: PropTypes.string.isRequired,
		link: PropTypes.string,
		description: PropTypes.string,
		price: PropTypes.shape({
			adult: PropTypes.number.isRequired,
			child: PropTypes.number,
			student: PropTypes.number,
			maxAgeForChild: PropTypes.number
		}),
		address: PropTypes.shape({
			street: PropTypes.string.isRequired,
			supplement: PropTypes.string,
			postcode: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			countryCode: PropTypes.string.isRequired
		})
	}),
	onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onClickSwitchDetailsAreShowing: () => dispatch(switchDetailsAreShowing())
});

export default connect(null, mapDispatchToProps)(ReducedActivityDetails);