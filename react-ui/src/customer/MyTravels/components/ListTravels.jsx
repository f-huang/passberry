import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Travel from "./Travel";

const Root = styled.div`
	padding: 12px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 100%;
`;

const ListTravels = ({ travels }) =>
	<Root>
		{travels.map(travel => (
			<Travel travel={travel} />
		))}
	</Root>;

export default ListTravels;