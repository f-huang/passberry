import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../app/theme";


const Radio = styled.input`
	width: 0;
	height: 0;
	margin: 0;
`;

const Label = styled.label`
	font-size: 0.7em;
	cursor: pointer;
	padding: 4px 16px;
	border-radius: 24px;
	border: 1px solid ${theme.colorPrimary};
	background-color: ${props => props.isChecked ? theme.colorPrimary : theme.colorInverse};
	color: ${props => props.isChecked ? theme.colorInverse : theme.colorPrimary};
`;

class RadioInput extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		choices: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			isChecked: PropTypes.bool
		})),
		onSelect: PropTypes.func
	};

	render() {
		const radioInputs =
			this.props.choices.map(choice =>
				<Label key={choice.id} isChecked={choice.isChecked}>
					<Radio
						key={choice}
						name={this.props.name}
						type="radio"
						value={choice.value}
						id={choice.id}
						onClick={ () => this.props.onSelect(choice.id)}
					/>
					{choice.value}
				</Label>
			);

		return (radioInputs);
	}
}

export default RadioInput;