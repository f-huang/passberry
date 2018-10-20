import React from "react";
import styled from "styled-components";

import iconBack from "../../../assets/icons/back_grey.svg";

const Arrow = styled.img`
	position: absolute;
	left: 50%;
	top: 20px;
	height: 24px;
`;

const ShowHideArrow = (props) => <Arrow src={iconBack} alt="icon-show-hide" {...props}/>;

export default ShowHideArrow;