import React from "react";
import styled from "styled-components";
import theme from "../app/theme";

const Title = styled.h1`
	text-align: center;
	font-weight: 900;
	font-size: 36px;
	margin: 12px 0;
`;

const ScreenTitle = (props) => <b><Title>{props.children}</Title></b>;

export default ScreenTitle;