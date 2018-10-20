import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";

const Input = styled.input`
	-webkit-appearance: none; -moz-appearance: none;
	border-radius: 2px;
	border: 0;
	width: 100%;
	padding: 14px 8px;
	overflow: hidden;
	
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
