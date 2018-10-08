import React from "react";
import styled from "styled-components";
import App from "../../App";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import Caption from "./component/Caption";
import * as ReactDOM from "react/cjs/react.development";
import PassBasketRecap from "./steps/PassBasketRecap";
import PassCustomize from "./steps/PassCustomize";
import PassVuegoMade from "./steps/PassVuegoMade";
import PassValidateActivities from "./steps/PassValidateActivities";
import Error404 from "../../Error404";
import theme from "../../app/theme";
import {withRouter} from "react-router-dom";

const CONTAINERS_MARGIN = '8px';

const JourneyTypes = {
	"vuego-made": {
		components: [
			PassVuegoMade,
			PassValidateActivities,
			PassBasketRecap
		],
		maxSteps: 3
	},
	"customize" : {
		components: [
			PassCustomize,
			PassValidateActivities,
			PassBasketRecap
		],
		maxSteps: 3
	}
};

const RelativeContainer = styled.div`
	position: relative;
	margin-bottom: calc(${props => props.bottomBarHeight}px + ${CONTAINERS_MARGIN});
`;


const FixedContainer = styled.div`
	position: fixed;
	width: 100%;
	right: 0;
	display: flex;
	flex-direction: row;
	background-color: ${theme.colorInverse};
	bottom: ${props => props.bottomBarHeight}px;
`;

const FixedContainerStyling = styled.div`
	width: 100%;
	padding: ${CONTAINERS_MARGIN};
`;

const Form = styled.form`
	font-size: 0.8em;
`;


class Pass extends React.Component {
	state = {
		bottomBarHeight: 0,
		step: 0,
		fixedContainer: undefined,
		caption: '',
	};

	constructor(props) {
		super(props);
		this.formAttrs = {
			updateCaption: this.updateCaption,
			updateFixedContainer: this.updateFixedContainer,
			onClickSubmit: this.onClickSubmit,
		};
		if (!this.isUrlCorrect())
			this.journeyType = undefined;
		else
			this.journeyType = JourneyTypes[this.props.match.params.typeOfJourney.toLowerCase()];
	}

	isUrlCorrect = () =>
		Object.keys(JourneyTypes).find(key =>
			key === this.props.match.params.typeOfJourney.toLowerCase());

	onNextStep = () => {
		if (this.state.step < 2)
			this.setState({step: this.state.step + 1});
	};

	onPreviousStep = () => {
		if (this.state.step > 0)
			this.setState({step: this.state.step - 1});
	};

	onClickSubmit = (e) => {
		this.onNextStep();
	};

	updateCaption = (caption) => this.setState({caption: caption});
	updateFixedContainer = (container) => {
		this.setState({fixedContainer: container});
	};


	render() {
		if (!this.journeyType)
			return (<Error404/>);
		const form = this.journeyType.components[this.state.step];
		return (
			<App
				itemSelected={BottomNavigationBar.items.currentTrip}
				title={`Étape ${this.state.step + 1}`}
				updateBarHeight={(height) => this.setState({bottomBarHeight: height})}
				onClickBackBtn={this.state.step > 0 ? this.onPreviousStep : undefined}
				backBtn
				homeBtn
			>
				<Caption>{this.state.caption}</Caption>
				<Form>
					<RelativeContainer bottomBarHeight={this.state.bottomBarHeight}>
						{ReactDOM.createElement(form, {
							step: this.state.step,
							...this.formAttrs
						})}
					</RelativeContainer>
					<FixedContainer
						bottomBarHeight={this.state.bottomBarHeight}>
						<FixedContainerStyling>
							{this.state.fixedContainer}
						</FixedContainerStyling>
					</FixedContainer>
				</Form>
			</App>
		);
	}
}

export default withRouter(Pass);