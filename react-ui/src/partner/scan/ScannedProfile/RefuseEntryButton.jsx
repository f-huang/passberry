import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import getScanState from "./getScanState";
import EnumScanState from "../EnumScanState";
import theme from "../../../app/theme";
import Button from "../../../component/Button/Button";


const RefuseButton = styled(Button)`
	background-color: ${props => props.isTicketValid ? theme.colorLightBlue : theme.colorRed};
	border-color: ${props => props.isTicketValid ? theme.colorLightBlue : theme.colorRed};
	border-radius: 50%;
	padding: 0px;
	width: 44px;
	height: 44px;
`;

const RefuseEntryButton = (props) => {
	return (
		<RefuseButton isTicketValid={props.scanState === EnumScanState.SUCCESS}>
			x
		</RefuseButton>
	);
};

const mapStateToProps = (state) => {
	return ({
		scanState: getScanState(state.scan.ticket)
	})
};

export default connect(mapStateToProps)(RefuseEntryButton);