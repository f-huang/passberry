import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import theme from "../../../app/theme";
import { withRouter } from "react-router-dom";

const Root = styled.div`
	background: ${props => props.isUsed ? theme.lightGrey : theme.colorInverse};
	border: ${props => props.isUsed ? "" : theme.colorPurple};
	color: ${props => props.isUsed ? "" : theme.colorPurple};
	overflow: hidden;
	box-shadow: 0 1px 2px 1px #000;
	border-radius: 6px;
	position: relative;
	flex: 1 1 42%;
	height: 20vw;
	margin: 12px;
	padding: 4px;
`;

const Destination = styled.h2`
	margin: 4px;
	font-weight: 600;
	font-size: 16px;
	font-style: italic;
`;

const Infos = styled.p`
	margin: 0;
	position: absolute;
	bottom: 8px;
	left: 8px;
	font-size: 14px;
	
`;

const currentTime = moment();

const to = (travel) => ({
	pathname: "/my-travels/details",
	search: `?destination=${travel.destination}&to=${travel.startDate}&endDate=${travel.endDate}`
});

const onClick = (history, to) => {
	history.push(to);
};

const Travel = ({ travel, history }) =>
	<Root onClick={ e => onClick(history, to(travel)) } isUsed={moment(travel.endDate).isBefore()}>
		<Destination>{travel.destination}</Destination>
		<Infos>
			{travel.numberOfTravelers}{" pers."}<br/>
			{moment(travel.startDate).format('MMM. YYYY')}
		</Infos>
	</Root>
;

export default withRouter(Travel);