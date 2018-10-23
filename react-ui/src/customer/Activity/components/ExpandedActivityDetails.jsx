import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { switchDetailsAreShowing } from "../activityActions";
import { showActivityKeyFrame} from "./KeyFrames";
import { connect } from "react-redux";
import ActivityDetailsLayout from "./ActivityDetailsLayout";
import ShowHideArrow from "./ShowHideArrow";
import theme from "../../../app/theme";
import ActivityDescription from "./ActivityDescription";
import ActivityPrice from "./ActivityPrice.jsx";
import ActivityAddress from "./ActivityAddress";
import BottomNavigationBar from "../../../component/BottomNavigationBar/BottomNavigationBar";

const Root = styled(ActivityDetailsLayout)`
	height: 80vh;
	animation: ${showActivityKeyFrame}  0.6s ease-in-out 0s;
	animation-fill-mode: both;
`;

const Arrow = styled(ShowHideArrow)`
	z-index: 1;
	transform: rotate(270deg) translate(0, -50%);
`;

const Container = styled.div`
	position: relative;
	display: block;
	overflow-y: scroll;
	height: calc(100% - ${BottomNavigationBar.BOTTOM_BAR_HEIGHT});
	margin-top: 52px;
	padding: 0px 24px 120px 24px;
`;

const ActivityName = styled.h1`
	font-size: 20px;
	font-weight: 900;
`;

const Line = styled.div`
	width: 100%;
	height: 8px;
	padding: 12px 0;
	box-shadow: 0 2px 2px -2px ${theme.borderColor};
`;

const Title = styled.h2`
	font-size: 16px;
`;

const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 12px;
`;

const ExpandedActivityDetails = ({ activity, onClick, onClickSwitchDetailsAreShowing }) => {
	return (
		<Root>
			<Container>
				<ActivityName>{ activity.name }</ActivityName>

				<DetailsContainer>
					<ActivityDescription description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident…"}/>
				</DetailsContainer>
				<Line/>

				<DetailsContainer>
					<Title>{"Tarifs"}</Title>
					<ActivityPrice price={activity.price}/>
				</DetailsContainer>
				<Line/>

				{/*<div>*/}
				{/*<Title>{"Horaires"}</Title>*/}
				{/*</div>*/}
				{/*<Line/>*/}
				<DetailsContainer>
					<Title>{"Adresse"}</Title>
					<ActivityAddress address={activity.address}/>
				</DetailsContainer>
				{activity.link &&
				<DetailsContainer>
					<Title>{"Contact"}</Title>
					<p>{activity.link}</p>
				</DetailsContainer>
				}
			</Container>
			<Arrow onClick={onClickSwitchDetailsAreShowing}/>
		</Root>
	)
};

ExpandedActivityDetails.propTypes = {
	activity:  PropTypes.shape({
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
			country: PropTypes.string
		})
	}),
	onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	onClickSwitchDetailsAreShowing: () => { console.log('click'); dispatch(switchDetailsAreShowing())}
});

export default connect(null, mapDispatchToProps)(ExpandedActivityDetails);