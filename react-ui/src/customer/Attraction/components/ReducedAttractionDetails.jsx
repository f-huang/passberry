import React from "react";
import styled from "styled-components";
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

const mapDispatchToProps = dispatch => ({
	onClickSwitchDetailsAreShowing: () => dispatch(switchDetailsAreShowing())
});

export default connect(null, mapDispatchToProps)(ReducedAttractionDetails);