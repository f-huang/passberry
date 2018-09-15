import React from "react";
import styled from "styled-components";

const Title = styled.h1`
	font-style: bolder;
	text-align: center;
`;

const ScreenTitle = (props) => <Title>{props.children}</Title>;

export default ScreenTitle;