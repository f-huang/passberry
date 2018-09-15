import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";

const Input = styled.input`
	-webkit-appearance: none; -moz-appearance: none;
	background-color: ${theme.colorInverse};
	border-radius: 2px;
	border: 0;
	padding: 12px 8px;
	margin: 0 2px;
	overflow: hidden;
	width: auto;
	
	&:focus {
		outline: none;
	}
`;

class TravelInput extends React.Component {
	render() {
		return (
			<Input {...this.props}/>
		);
	}
}

export default TravelInput;
