import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../app/theme";
import moment from "moment";

const Root = styled.div`
	background-color: ${theme.colorInverse};
	border-radius: 6px;
	width: 100%;
`;

const Name = styled.span`
	font-size: 15px;
	font-weight: bold;
`;


const EnumFareType = {ADULT: "ADULT", CHILD: "CHILD", STUDENT: "STUDENT"};

const getAge = (birthdate) => {
	if (birthdate)
		return moment().diff(moment(birthdate).format('YYYY-MM-DD'), 'years', false);
	else
		return "Age non renseigné,"
};

const getFareType = (studentStatus, age, ticketPrice) => {
	if (ticketPrice && parseInt(ticketPrice.maxAgeForChild, 10) > parseInt(age, 10))
		return EnumFareType.CHILD;
	// else if (status && moment(status.expirationDate).isBefore())
	// 	return "Tarif Étudiant peut-être expiré, à valider par vos soins";
	// else if (status && status.isValidated)
	// 	return "Tarif étudiant validé par Vuego";
	// else if (status && !status.isValidated)
	// 	return "Tarif étudiant à valider par vos soins";
	else if (studentStatus)
		return EnumFareType.STUDENT;
	else
		return EnumFareType.ADULT;
};

const isChecked = (fareType, studentStatus, birthdate) => {
	if (fareType === EnumFareType.STUDENT && studentStatus
		&& (moment(studentStatus.expirationDate).isBefore() || !studentStatus.isValidated))
		return false;
	else if (fareType === EnumFareType.CHILD && !birthdate)
		return false;
	else
		return true;
};

const Traveler = ({ traveler, ticketPrice }) => {
	const age = getAge(traveler.birthdate);
	const fareType = getFareType(traveler.studentStatus, age, ticketPrice);
	return (
		<Root>
			<Name>{traveler.firstName} {traveler.lastName}</Name>
			{age}
			{fareType}
			{isChecked(fareType, traveler.studentStatus, traveler.birthDate) ? "vérifié par Vuego" : "à vérifier par vos soins"}
		</Root>
	)
};

export default Traveler;