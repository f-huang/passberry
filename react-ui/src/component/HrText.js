import React from "react";
import styled from "styled-components";
import theme from "../app/theme";

const Hr = styled.div`
	& {
		display: flex;
		flex-basis: 100%;
		align-items: center;
		color: ${theme.textColor};
		margin: 8px 0;
	}
	&:before, &:after {
		content: "";
		flex-grow: 1;
		background: ${props => props.lineColor ? props.lineColor : theme.textColor};
		height: 1px;
		font-size: 0px;
		line-height: 0px;
		margin: 0px 8px;
	}
`;

const HrText = (props) => <Hr {...props}>{props.value}</Hr>;

export default HrText;


