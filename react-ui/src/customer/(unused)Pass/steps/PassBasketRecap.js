import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../app/theme";
import Button from "../../../component/Button/Button";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import PassInputsHandler from "../PassInputsHandler";

const HorizontalLine = styled.td`
	height: 0;
	// border-top: 1px solid ${theme.bg};
`;

const Table = styled.table`
	width: 100%;
	border-spacing: 8px;
`;
const Arrow = styled.i`
	border: solid ${theme.bg};
	border-width: 0 2px 2px 0;
	display: block;
	height: 8px;
	width: 8px;
	transform: rotate(${props => props.degrees}deg);
`;
const Checkbox = styled.input``;

const TableTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 12px;
	font-size: 0.8em;
	font-weight: 600;
`;
const TableDesignation = styled.th`
	text-align: ${props => props.first ? 'start' : 'end'};
	font-size: 0.6em;
	padding-left: 0;
	font-weight: normal;
	border-bottom: 1px solid ${theme.bg};
`;

const TableRecap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 12px;
	font-size: 0.8em;
`;
const Row = styled.tr`
`;

const Details = styled.td`
	text-align: ${props => props.first ? 'start' : 'end'};
	font-size: 0.6em;
	padding-left: 0;
`;

const FixedContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const buttonStyle = {
	minWidth: '160px',
	padding: '8px 12vw'
};
const CAPTION = `Conseil : payer une journée et acheter le reste plus tard. Les autres journées seront sauvegardées dans la rubrique "Mes sélections".`;

const defaultBasket = (numberOfUsers) => [
	[
		{
			event: {
				name: "Musée Océanographique",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
		{
			event: {
				name: "Jardin exotique",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
		{
			event: {
				name: "Palais princier",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
	],
	[
		{
			event: {
				name: "Musée Océanographique",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
		{
			event: {
				name: "Jardin exotique",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
		{
			event: {
				name: "Palais princier",
				price: {adult: 12, child: 12}
			},
			quantity: {adult: numberOfUsers, child: 0}
		},
	],
];

class PassBasketRecap extends React.Component {

	static propTypes = {
		updateCaption: PropTypes.func,
		updateFixedContainer: PropTypes.func,
		onClickSubmit: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.passHandler = new PassInputsHandler();
		this.numberOfUsers = this.passHandler.getNumberOfUsers();

		const basket = defaultBasket(this.numberOfUsers || 1);
		this.state = {
			eventIsShowing: new Array(basket.length).fill(true),
			eventIsChecked: new Array(basket.length).fill(true),
			basket: basket
		};
		this.fixedContainer =
			<FixedContainer>
				<Button style={buttonStyle} value={"Sauvegarder"}/>
				<ButtonSubmit value={'Continuer'} style={buttonStyle} onClick={this.props.onClickSubmit}/>
			</FixedContainer>;
	}

	componentDidMount() {
		this.props.updateCaption(CAPTION);
		this.props.updateFixedContainer(this.fixedContainer);
	}

	hideEvent = (index) => {
		const tmp = this.state.eventIsShowing;
		tmp[index] ^= 1;
		this.setState({eventIsShowing: tmp});
	};

	handleCheckedDay = (index) => {
		const tmp = this.state.eventIsChecked;
		tmp[index] ^= 1;
		this.setState({eventIsChecked: tmp});
	};

	render() {
		return (
			this.state.basket.map((day, index) =>
				<div key={index}>
					<TableTitle>
						<Checkbox type="checkbox"
						          value={this.state.eventIsChecked[index]}
						          onChange={() => this.handleCheckedDay(index)}/>
						{`Jour ${index + 1}`}
						<Arrow onClick={() => this.hideEvent(index)}
						       degrees={this.state.eventIsShowing[index] ? -45 : 45}/>
					</TableTitle>
					{(this.state.eventIsShowing[index]) ?
						<Table>
							<thead>
							<Row>
								<TableDesignation first>{"Désignation"}</TableDesignation>
								<TableDesignation>{"Qté"}</TableDesignation>
								<TableDesignation>{"Prix"}</TableDesignation>
							</Row>
							<Row><HorizontalLine colSpan={3}/></Row>
							</thead>
							<tbody>
							{day.map((item, index) =>
								<Row key={item.event.name + index}>
									<Details first>{item.event.name}</Details>
									<Details>{item.quantity.adult}</Details>
									<Details>{item.quantity.adult * item.event.price.adult + '€'}</Details>
								</Row>
							)}
							</tbody>
						</Table>
						: ""}
					<TableRecap>
						<p>{`${day.length} activités`}</p>
						<p>{`${day.map(item => item.quantity.adult * item.event.price.adult)
							.reduce((prev, next) => prev + next)}€`}
							</p>
					</TableRecap>
				</div>
			)
		);
	}
}

export default PassBasketRecap;