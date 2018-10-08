import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Timeline from "../component/Timeline";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import Button from "../../../component/Button/Button";
import {withRouter} from "react-router-dom";
import PassInputsHandler from "../PassInputsHandler";
import Attraction from "../../Attraction.class";

const CAPTION = (nDays) => `Nous vous recommandons ces activités pour ${nDays} jour${nDays > 1 ? 's' : ''} à Monaco.`;

const FixedContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 4px;
`;

const PriceContainer = styled.div`
	display: flex;
	flex-direction: column;
	text-align: end;
`;

const Price = styled.p`
	${props => props.lineThrough && 'text-decoration: line-through;'}
	margin: 0;
	font-size: 0.9em;
`;

const buttonStyle = {
	minWidth: '160px',
	padding: '8px 12vw'
};


class PassValidateActivities extends React.Component {
	static propTypes = {
		updateCaption: PropTypes.func,
		updateFixedContainer: PropTypes.func,
		onClickSubmit: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.attraction = new Attraction();
		this.passHandler = new PassInputsHandler();
		this.numberOfDays = this.passHandler.getVuegoPassNumberOfDays();
		this.events = this.attraction.getVuegoMadeAttractions(this.numberOfDays);
		this.finalCost = 30;
		this.totalCost = this.events
			.map(event => event.price.adult)
			.reduce((prev, next) => prev + next);
		this.fixedContainer =
			<FixedContainer>
				<Row>
					<Button style={buttonStyle} value={"Voir la carte"}/>
					<PriceContainer>
						<Price lineThrough>Total : {this.totalCost}€ </Price>
						<Price>Prix final : {this.finalCost}€</Price>
					</PriceContainer>
				</Row>
				<Row>
					<Button onClick={this.onClickCustomize} style={buttonStyle} value={"Personnaliser"}/>
					<ButtonSubmit value={'Valider'} style={buttonStyle} onClick={this.props.onClickSubmit}/>
				</Row>
			</FixedContainer>;
	}

	onClickCustomize = (event) => {
		event.preventDefault();
		this.props.history.push(`customize`);
	};

	componentDidMount() {
		this.props.updateCaption(CAPTION(this.numberOfDays));
		this.props.updateFixedContainer(this.fixedContainer)
	}

	render() {
		return (<Timeline events={this.events}/>);
	}
}

export default withRouter(PassValidateActivities);