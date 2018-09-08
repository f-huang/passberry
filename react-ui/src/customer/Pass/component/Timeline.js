import React from 'react';
import styled from 'styled-components';
import theme from "../../../app/theme";

const DOT_SIZE = '8px';

const Table = styled.table`
	width: 100%;
	border-spacing: 0px;
`;

const Row = styled.tr`
	position: relative;
	vertical-align: top;
`;

const Cell = styled.td`
	padding: 0 4px;
`;
const TimelineContainer = styled.div`
	margin: 0;
	position: relative
`;

const Dot = styled.div`
	position: absolute;
	width: ${DOT_SIZE};
	height: ${DOT_SIZE};
	max-width: 40px;
	max-height: 40px;
	border-radius: 50%;
	background-color: ${theme.colorPrimary};
	transform: translateX(-50%);
	top: 8px;
	z-index: 2;
`;

const VerticalLine = styled.div`
	border-left: 4px solid ${theme.colorPrimaryLight};
	height: ${props => props.last ? '32px' : '16vh'};
	width: 0;
	transform: translate(-50%);
`;

const Name = styled.h2`
	font-size: 0.8em;
	line-height: 0;
`;

const NoQueue = styled.p`
	display: block;
	font-size: 0.5em;
	font-style: italic;
`;

const TimeSlot = styled.p`
	font-size: 0.6em;
	line-height: 0;
	text-align: center;
`;

const Price = styled.p`
	font-size: 0.7em;
	line-height: 0;
`;

const TimelineEvent = (props) =>
	<Row>
		<Cell>
			<TimeSlot>{props.event.when}</TimeSlot>
		</Cell>
		<Cell>
			<TimelineContainer>
				<Dot/>
				<VerticalLine last={props.last}/>
			</TimelineContainer>
		</Cell>
		<Cell>
			<Name>{props.event.name}</Name>
			{(props.event.NoQueue) &&
			<NoQueue>{"Ticket coupe-file"}</NoQueue>}
		</Cell>
		<Cell>
			<Price>{`Adulte : ${props.event.price.adult}`}€</Price>
			<Price>{`Enfant : ${props.event.price.child}`}€</Price>
		</Cell>
	</Row>;

class Timeline extends React.Component {
	render() {
		return (
			<Table className="Timeline" ref="timeline">
				<tbody>
				{this.props.events.map((event, i) =>
					<TimelineEvent event={event} key={i} last={i + 1 === this.props.events.length}/>
				)}
				</tbody>
			</Table>
		);
	}
}

export default Timeline;