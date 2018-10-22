import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from "../../../component/Button/Button";
import TravelInput from "./TravelInput";
import theme from "../../../app/theme";


const Container = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Wrap = styled.div`
	width: 100%;
	border: 1px solid ${theme.colorPrimary};
`;

const ButtonRemove = styled(Button)`
	flex: 0.2;
	padding: 12px 12px;
	border-radius: 0;
`;

const Traveler = ({traveler, removable, index, onClick, onChange}) => (
	<Container>
		<Wrap>
			<TravelInput
				name={"travelers"}
				placeholder={"Visiteur " + (index + 1)}
				value={traveler ? traveler.firstName || "" : ""}
				onChange={onChange}
			/>
		</Wrap>
		{removable &&
		<ButtonRemove onClick={onClick}>x</ButtonRemove>
		}

	</Container>
);

const mapStateToProps = (state, {index}) => {
	return {
		traveler: state.travelDetails.travelers[index]
	};
};

export default connect(mapStateToProps)(Traveler)