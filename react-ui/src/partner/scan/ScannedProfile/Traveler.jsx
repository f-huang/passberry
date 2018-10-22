import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../../app/theme";
import moment from "moment";
import EnumFareType from "../EnumFareType";

const Root = styled.div`
	background-color: ${theme.colorInverse};
	border-radius: 6px;
	padding: 12px;
	width: 100%;
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: bold;
`;

const Age = styled.div`
	font-size: 14px;
	margin-top: 7px;
`;

const Fare = styled.div`
	font-size: 14px;
	margin-top: 7px;
`;

const Checked = styled.div`
	margin-top: 7px;
	color: ${theme.colorPurple};
	font-size: 16px;
	font-weight: bold;
`;

const ByVuego = styled.span`
	font-size: 13px;
	font-weight: 100;
	font-style: italic;
`;


const getAge = (birthdate) => {
	if (birthdate)
		return moment().diff(moment(birthdate).format('YYYY-MM-DD'), 'years', false);
	else
		return "Age non renseigné,"
};

const getFareType = (studentStatus, age, ticketPrice) => {
	if (ticketPrice && parseInt(ticketPrice.maxAgeForChild, 10) > parseInt(age, 10))
		return EnumFareType.CHILD;
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
	return true;
};

const Traveler = ({ traveler, ticketPrice }) => {
	const age = getAge(traveler.birthdate);
	const fareType = getFareType(traveler.studentStatus, age, ticketPrice);
	return (
		<Root>
			<Name>{traveler.firstName} {traveler.lastName}</Name>
			<Age>{`${age} ans`}</Age>
			<Fare>{`Tarif ${fareType.display}`}</Fare>
			{isChecked(fareType, traveler.studentStatus, traveler.birthDate) ?
				<Checked>{"Tarif validé"} <ByVuego>{"par Vuego"}</ByVuego></Checked>:
				<Checked>{"Justificatif à vérifier par vos soins."}</Checked>
			}
		</Root>
	)
};

export default Traveler;