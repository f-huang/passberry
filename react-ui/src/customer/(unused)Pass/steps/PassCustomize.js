import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import Button from "../../../component/Button/Button";
import Label from "../component/Label";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import PassUserForm from "./PassUserForm";
import TextInput from "../../../component/TextInput/TextInput";
import touristStatus from "../touristStatus";

const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 8px auto;
`;

const FixedContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const datePickerInputStyle = {
	width: '68px'
};

const CAPTION = "Nous avons besoin de quelques infos pour vous proposer les meilleurs tarifs.";
const DEFAULT_TOURIST_DATA = {name: "", birthdate: "", status: touristStatus.find(option => option.defaultValue).value};


class PassCustomize extends React.Component {
	static propTypes = {
		updateCaption: PropTypes.func,
		updateFixedContainer: PropTypes.func,
		onClickSubmit: PropTypes.func,
	};

	state = {
		startDate: moment(),
		endDate: moment(),
		touristData: [DEFAULT_TOURIST_DATA],
		isFormValid: false
	};

	componentDidMount() {
		this.props.updateCaption(CAPTION);
		this.updateFixedContainer(false);
	}

	updateFixedContainer = (isFormValid) => {
		this.props.updateFixedContainer(
			<FixedContainer>
				<ButtonSubmit
					value={'→'}
					isFormValid={isFormValid}
					onClick={this.props.onClickSubmit}
				/>
			</FixedContainer>
		);
	};

	updateTouristData = (newData) => {
		this.setState({touristData: newData});
		this.checkFormValidity();
	};

	onChangeStartDate = (date) => {
		if (date.isBefore(moment()))
			return ;
		this.setState({startDate: date});
		if (date.isAfter(this.state.endDate))
			this.setState({endDate: date});
		this.checkFormValidity();
		this.inputEndDate.focus();
	};

	onChangeEndDate = (date) => {
		if (date.isBefore(moment()) || date.isBefore(this.state.startDate))
			return ;
		this.setState({endDate: date});
		this.checkFormValidity();
	};

	onClickAddTourist = (e) => {
		e.preventDefault();
		this.setState({
			touristData: this.state.touristData.concat([DEFAULT_TOURIST_DATA])
		});
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
			&& this.state.endDate
		);
		this.updateFixedContainer(isValid);
	};

	render() {
		return (
			<div>
				<InputContainer>
					<Label>{"Du"}</Label>
					<DatePicker
						selected={this.state.startDate}
						onChange={this.onChangeStartDate}
						customInput={<TextInput style={datePickerInputStyle} name={"startDate"}/>}
					/>
					<Label>{"au"}</Label>
					<DatePicker
						selected={this.state.endDate}
						onChange={this.onChangeEndDate}
						customInput={
							<TextInput
								innerRef={ref => this.inputEndDate = ref}
								style={datePickerInputStyle}
								name={"endDate"}
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

export default PassCustomize;