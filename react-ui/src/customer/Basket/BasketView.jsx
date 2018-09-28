import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import theme from "../../app/theme";
import BackActionBar from "../../component/ActionBar/BackActionBar";

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

class BasketView extends React.Component {
	render() {
		return (
			<div>
			<BackActionBar to={'/' + (this.props.destination || "") } title={"Basket"}/>
				{ (this.props.basket.items) && this.props.basket.items.map((item, index) =>
					<div>
					<p key={index}>{item.product.name}</p>
					<p key={index}>{item.quantity}</p>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	// console.log(state.basket);
	return ({
		destination: state.travelDetails.destination,
		basket: state.basket
	})
};

export default connect(mapStateToProps)(BasketView);