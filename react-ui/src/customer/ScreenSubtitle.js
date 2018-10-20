import React from "react";
import styled from "styled-components";

const Subtitle = styled.h2`
	font-style: bolder;
	text-align: center;
	font-size: 24px;
	margin: 4px 0;
`;

const ScreenSubtitle = (props) => <Subtitle>{props.children}</Subtitle>;

export default ScreenSubtitle;