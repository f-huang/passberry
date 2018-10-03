import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from "../../../component/Button/Button";
import TravelInput from "./TravelInput";
import theme from "../../../app/theme";


const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`;

const buttonStyle = {
	position: 'absolute',
	right: '8px',
	backgroundColor: theme.colorPurple,
	width: '24px',
	height: '24px',
	borderRadius: '50%',
	padding: 0,
};

const InputContainer = styled.div`
	flex: 5;
`;

const Traveler = ({traveler, removable, index, onClick, onChange}) => (
	<Container>
		<InputContainer>
			<TravelInput
				name={"travelers"}
				placeholder={"Visiteur " + (index + 1)}
				value={traveler ? traveler.name || "" : ""}
				onChange={onChange}
			/>
		</InputContainer>
		{removable &&
		<Button value={"x"} onClick={onClick} style={buttonStyle}/>
		}
	</Container>
);

const mapStateToProps = (state, {index}) => {
	return {
		traveler: state.travelDetails.travelers[index]
	};
};

export default connect(mapStateToProps)(Traveler)