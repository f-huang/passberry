import React from "react";
import styled from "styled-components";
import theme from "../../app/theme";

const Bar = styled.div`
	background-color: ${theme.colorPrimary};
	overflow: hidden;
	height: 7vh;
	max-height: 86px;
	width: 100vw;
`;

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	height: 100%;
	padding: 12px;
`;

const ActionBarContainer = (props) => {
	return (
		<Bar className={props.className}>
			<Container>
				{props.children}
			</Container>
		</Bar>
	);
}

export default ActionBarContainer