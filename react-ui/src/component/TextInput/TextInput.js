import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import theme from "../../app/theme";

const Container = styled.div`
	margin: 4px;
`;

const Input = styled.input`
	border-radius: 6px;
	padding: 2px 6px;
	font-size: 0.7em;
	-webkit-appearance: none; -moz-appearance: none;
	line-height: 28px;
	border: 1px solid ${theme.lightGrey};

	&:focus {
		outline: none;
		border-color: ${theme.colorPrimary};
	}
	&::placeholder, &::-webkit-input-placeholder {
		color: ${theme.lightGrey};
	}
`;

const Label = styled.label`
	display: block;
	position: relative;
	font-size: 0.6em;
	margin-bottom: 4px;
`;

class TextInput extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		name: PropTypes.string.isRequired,
		innerRef: PropTypes.func
	};

	render() {
		const {innerRef, ...rest} = this.props;
		return (
			<Container className="TextInput">
				{ (this.props.label) &&
				<Label className={"TextInputLabel"} htmlFor={this.props.id}>
					{this.props.label}
				</Label>}
				<Input className={`TextInput-input ${this.props.className}`}
				       ref={ innerRef }
				       {... rest}
				/>
			</Container>
		);
	}
}

export default TextInput;