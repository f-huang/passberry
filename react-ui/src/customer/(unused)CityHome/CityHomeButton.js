import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
	color: ${props => props.theme.color};
	background-color: ${props => props.theme.bgColor ? props.theme.bgColor : '#fff'};
	border: 1px solid ${props => props.theme.color};
	border-radius: 5px;
	fontSize: 18px;
	padding: 24px 24px;
	width: 40vw;
	min-height: 80px;
	margin: 0 8px;
	outline: none;
	user-select: none;
	
	&:hover, &:focus, &:active {
		background-color: ${props => props.theme.color};
		color: #fff;
	}
`;

class CityHomeButton extends React.Component {
	static propTypes = {
		value: PropTypes.string.isRequired
	};
	static defaultProps = {
	};

	render() {
		return (
			<Button className={`HomeButton`} {...this.props}>
				{ this.props.value }
			</Button>
		);
	}
}

export default CityHomeButton;