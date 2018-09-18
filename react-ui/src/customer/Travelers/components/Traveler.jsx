import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import TextInput from "../../../component/TextInput/TextInput";
import Button from "../../../component/Button/Button";


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
	backgroundColor: "#A1383C",
	width: '24px',
	height: '24px',
	borderRadius: '50%',
	padding: 0,
};

const InputContainer = styled.div`
	flex: 5;
`;

const Traveler = ({traveler, removable, onClick, onChange}) => (
	<Container>
		<InputContainer>
			<TextInput
				style={{	width: '85%'}}
				name={"travelers"}
				placeholder={"Prénom"}
				value={traveler ? traveler.name || "" : ""}
				onChange={onChange}
			/>
		</InputContainer>
		{removable &&
		<Button value={"x"} onClick={onClick} style={buttonStyle}/>
		}
	</Container>
);

const mapStateToProps = (state, {id}) => {
	return {
		traveler: state.travelers.travelers[id]
	};
};

export default connect(mapStateToProps)(Traveler)