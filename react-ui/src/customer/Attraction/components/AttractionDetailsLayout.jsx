import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";

const Layout = styled.div`
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100vw;
	min-height: 160px;
	background-color: ${theme.colorInverse};
	border-radius: 45px;
	box-shadow: 0 -1px 10px #000;
`;

const AttractionDetailsLayout = (props) => <Layout {...props}/>;

export default AttractionDetailsLayout;