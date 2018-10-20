import React from "react";
import styled from "styled-components";
import theme from "../../../../app/theme";

const Root = styled.div`
	background-color: ${theme.colorInverse};
	width: 100%;
	padding: 4px 8px;
`;

const Label = styled.h2`
	margin: 0;
	font-size: 16px;
	font-weight: bold;
`;

const TicketLabel = (props) => (
	<Root>
		<Label>
		{props.children}
		</Label>
	</Root>
);

export default TicketLabel;
