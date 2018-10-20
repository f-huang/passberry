import React from "react";
import styled from "styled-components";
import theme from "../app/theme";

const Title = styled.h1`
	text-align: center;
	font-weight: 900;
	font-size: 48px;
`;

const ScreenTitle = (props) => <b><Title>{props.children}</Title></b>;

export default ScreenTitle;