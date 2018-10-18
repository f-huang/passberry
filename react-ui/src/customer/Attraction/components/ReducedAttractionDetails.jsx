import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { switchDetailsAreShowing } from "../attractionActions";
import { hideAttractionKeyFrame } from "./KeyFrames";

import AttractionDetailsLayout from "./AttractionDetailsLayout";
import ShowHideArrow from "./ShowHideArrow";

const Root = styled(AttractionDetailsLayout)`
	height: 20vh;
	animation: ${hideAttractionKeyFrame} 0.6s ease-in-out 0s;
`;

const Arrow = styled(ShowHideArrow)`
	transform: rotate(90deg) translate(0, 50%);
`;


const ReducedAttractionDetails = ({ attraction, onClick, onClickSwitchDetailsAreShowing }) => {
	return (
		<Root>
			<Arrow onClick={onClickSwitchDetailsAreShowing}/>
		</Root>
	)
};

ReducedAttractionDetails.propTypes = {
	attraction: {
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
	},
	onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onClickSwitchDetailsAreShowing: () => dispatch(switchDetailsAreShowing())
});

export default connect(null, mapDispatchToProps)(ReducedAttractionDetails);