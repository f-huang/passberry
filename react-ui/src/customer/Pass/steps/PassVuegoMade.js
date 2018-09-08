import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import RadioInput from "../component/RadioInput";
import Button from "../../../component/Button/Button";
import Label from "../component/Label";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import PassUserForm from "./PassUserForm";
import TextInput from "../../../component/TextInput/TextInput";

import touristStatus from "../touristStatus";
import PassInputsHandler from "../PassInputsHandler";

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 8px auto;
`;

const FixedContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const CAPTION = "Nous avons besoin de quelques infos pour vous proposer les meilleurs tarifs.";
const defaultStatus =  touristStatus.find(option => option.defaultValue).value;
const DEFAULT_TOURIST_DATA = {name: "", birthdate: "", status: defaultStatus};


class PassVuegoMade extends React.Component {
	static propTypes = {
		updateCaption: PropTypes.func,
		updateFixedContainer: PropTypes.func,
		onClickSubmit: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.passHandler = new PassInputsHandler();
		this.state = {
			choices: [
				{id: this.passHandler.vuegoPassNumberOfDays[0].id, value: "1 jour", isChecked: true},
				{id: this.passHandler.vuegoPassNumberOfDays[1].id, value: "2 jours"}
			],
			startDate: moment(),
			touristData: [DEFAULT_TOURIST_DATA],
			isFormValid: false
		};
		this.onSelectDuration = this.onSelectDuration.bind(this);
	}

	componentDidMount() {
		this.props.updateCaption(CAPTION);
		this.updateFixedContainer(false);
		this.getUser().then(users => {
			if (users && users[0].status === "")
				users[0].status = defaultStatus;
			this.setState({touristData: users});
			this.checkFormValidity();
		});
		const nDays = this.passHandler.getVuegoPassNumberOfDays();
		if (nDays) {
			const id = this.passHandler.vuegoPassNumberOfDays.find(obj => obj.value === nDays).id;
			this.onSelectDuration(id);
		}
	}

	getUser = async () => await this.passHandler.getUsers();

	updateFixedContainer = (isFormValid) => {
		this.props.updateFixedContainer(
			<FixedContainer>
				<ButtonSubmit
					value={'→'}
					isFormValid={isFormValid}
					onClick={this.onClickSubmit}
				/>
			</FixedContainer>
		);
	};

	updateTouristData = (newData) => {
		this.setState({touristData: newData});
		this.checkFormValidity();
	};

	onClickSubmit = (event) => {
		this.passHandler.saveUsers(this.state.touristData);
		this.passHandler.saveVuegoPassNumberOfDays(this.state.choices.find(choice => choice.isChecked).id);
		this.passHandler.saveStartDate(this.state.startDate);
		this.props.onClickSubmit(event);
	};

	onSelectDuration = (id) => {
		const index = this.state.choices.findIndex(choice => choice.id === id);
		if (index !== undefined && index !== null) {
			const tmpChoices = this.state.choices;
			tmpChoices.forEach(tmpChoice => delete tmpChoice.isChecked);
			tmpChoices[index].isChecked = true;
			this.setState({choices: tmpChoices});
			this.checkFormValidity()
		}
	};

	onChangeStartDate = (date) => {
		if (date.isBefore(moment()))
			return ;
		this.setState({startDate: date});
		this.checkFormValidity();
	};

	onClickAddTourist = (e) => {
		e.preventDefault();
		this.setState({touristData: this.state.touristData.concat([DEFAULT_TOURIST_DATA])});
	};

	onClickDeleteTourist = (e, index) => {
		e.preventDefault();
		const tmpData = this.state.touristData;
		tmpData.splice(index, 1);
		this.setState({touristData: tmpData});
	};

	checkFormValidity = () => {
		const isValid = !!(this.state.touristData.length > 0
			&& this.state.touristData[0].name
			&& this.state.touristData[0].birthdate
			&& this.state.touristData[0].status
			&& this.state.startDate
			&& this.state.choices.find(choice => choice.isChecked)
		);
		this.updateFixedContainer(isValid);
	};

	render() {
		return (
			<div>
				<InputContainer>
					<Label>{"Durée du séjour"}</Label>
					<RadioInput name="duration" choices={this.state.choices} onSelect={this.onSelectDuration}/>
				</InputContainer>
				<InputContainer>
					<Label>{"Début du séjour"}</Label>
					<DatePicker
						selected={this.state.startDate}
						onChange={this.onChangeStartDate}
						customInput={<TextInput name={"journeyStartDate"}
						/>}
					/>
				</InputContainer>
				<PassUserForm
					touristData={this.state.touristData}
					updateTouristData={this.updateTouristData}
					onRemove={this.onClickDeleteTourist}
				/>
				<Button value={"+"} onClick={this.onClickAddTourist}/>
			</div>
		);
	}
}

export default PassVuegoMade;