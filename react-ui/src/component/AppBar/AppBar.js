import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import backIcon from "../../assets/icons/arrow_left_black.svg";
import homeIcon from "../../assets/icons/home_black.svg";
import {withRouter} from "react-router-dom";

const Bar = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between | center;
	max-height: 104px;
	padding: 1.5vh;
	border-bottom: 1px solid #eeeeee
`;

const Title = styled.h1`
	margin: 1vh;
	margin: 0 auto;
	font-weight: lighter;
	font-size: 1em;
`;

const Icon = styled.img`
	width: 24px;
	height: 24px;
`;

class AppBar extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		backBtn: PropTypes.bool,
		homeBtn: PropTypes.bool,
		onMount: PropTypes.func,
		onClickBackBtn: PropTypes.func,
	};
	static defaultProps = {
		title: "Title",
		backBtn: false,
		homeBtn: false
	};

	constructor(props) {
		super(props);
		this.handleBackBtn = this.handleBackBtn.bind(this);
	}

	handleBackBtn = () => {
		if (this.props.onClickBackBtn)
			this.props.onClickBackBtn();
		else
			this.props.history.goBack();
	};

	handleHomeBtn = () => {
		if (this.props.homeBtn) {
			const city = this.passHandler.getCity();
			const to = city ? '/' + city : '/';
			this.props.history.push(to);
		}
	} ;

	render() {
		return (
			<Bar>
				{ (this.props.backBtn) &&
				<Icon
					src={backIcon}
					alt={"back-btn-icon"}
					onClick={this.handleBackBtn}
				/>}
				<Title>{this.props.title}</Title>
				{ (this.props.homeBtn) &&
				<Icon
					src={homeIcon}
					alt={"home-btn-icon"}
					onClick={this.handleHomeBtn}
				/>}
			</Bar>
		)
	}
}

export default withRouter(AppBar);