import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../app/theme";

const GREYEDOUT_COLOR = '#BBB';

const CustomButton = styled.button`
	-webkit-appearance: none; -moz-appearance: none; -webkit-user-select: none; -webkit-touch-callout: none;
	display: block;
	background-color: ${props => props.isClickable ? props.backgroundColor : GREYEDOUT_COLOR};
	opacity: ${props => props.isClickable ? 'auto' : '0.8'};
	color: ${theme.colorInverse};
	border-radius: 42px;
	border: 1px solid ${props => props.isClickable ? props.backgroundColor : GREYEDOUT_COLOR};
	padding: 2vmin 6vmin;
	font-size: var( — btn-font-size, 18px);
	cursor: pointer;
	text-align: center;
	pointer-events: ${props => props.isClickable ? 'auto' : 'none'};
	box-shadow: 0 2px 0 #000;

	&:focus {
		outline: none;
	}
`;

class Button extends React.Component {
	state = { isClickable: true };

	static propTypes = {
		backgroundColor: PropTypes.string
	};

	static defaultProps = {
		backgroundColor: theme.colorPrimary
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.isClickable !== undefined)
			this.setState({isClickable: nextProps.isClickable});
	}


	render() {
		const {secondClassName, ...rest} = this.props;
		return (
			<CustomButton
				className={`${ secondClassName }`}
				isClickable={this.state.isClickable}
				{... rest}>
				{ this.props.children }
			</CustomButton>
		);
	}
}

export default Button;