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
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			isChecked: PropTypes.bool
		})),
		onSelect: PropTypes.func
	};

	render() {
		const radioInputs =
			this.props.items.map(item =>
				<Label key={item.id} isChecked={item.isChecked}>
					<Radio
						key={item}
						name={this.props.name}
						type="radio"
						value={item.value}
						id={item.id}
						onClick={ () => this.props.onSelect(item.id)}
					/>
					{item.value}
				</Label>
			);

		return (radioInputs);
	}
}

export default RadioInput;