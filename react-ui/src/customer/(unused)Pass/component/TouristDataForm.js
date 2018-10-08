import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../../../app/theme";
import TextInput from "../../../component/TextInput/TextInput";
import Button from "../../../component/Button/Button";
import touristStatus from  "../touristStatus";

const Form = styled.div`
`;


const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
`;
const Text = styled.p`
	margin: 6px;
	display: block;
	font-size: 0.8em;
`;

const SelectStatus = styled.select`
    -webkit-appearance: none;
    box-shadow: none;
	
	&:focus {
		outline: none;
	}
`;

const buttonStyle = {
	style: {
		width: '20px',
		height: '20px',
		borderRadius: '50%',
		padding: '0',
		fontSize: '10px',
		marginLeft: '6px'
	},
	backgroundColor: theme.colorTertiary
};

class TouristDataForm extends React.Component {
	static propTypes = {
		onChangeName: PropTypes.func.isRequired,
		onChangeBirthdate: PropTypes.func.isRequired,
		onChangeStatus: PropTypes.func.isRequired,
		onRemove: PropTypes.func
	};

	render() {
		const inputs = [{
			placeholder: "Prénom",
			id: "Tourist-name" ,
			name: "touristName",
			required: true,
			value: this.props.value.name,
			onChange: this.props.onChangeName
		}, {
			placeholder: "Date de naissance (jj/mm/yyyy)",
			id: "Tourist-birthdate",
			name: "touristBirthdate",
			style: {minWidth: '172px'},
			pattern: "\\d{1,2}/\\d{1,2}/\\d{4}",
			required: true,
			value: this.props.value.birthdate,
			onChange: this.props.onChangeBirthdate
		}];

		return (
			<Form>
				<Container>
					{(this.props.onRemove) &&
					<Button value={"x"} onClick={this.props.onRemove} {...buttonStyle}/>}
					<Text>{`Visiteur ${this.props.index + 1}`}</Text>
				</Container>
				<Container>
					{inputs.map(input =>
						<TextInput key={input.id} {...input}/>
					)}
					<SelectStatus
						id={"Tourist-status"}
						onChange={this.props.onChangeStatus}
						value={this.props.value.status}
					>
						{touristStatus.map(option =>
							<option key={option.value} value={option.value}>{option.label}</option>
						)}
					</SelectStatus>
				</Container>
			</Form>
		);
	}
}

export default TouristDataForm;