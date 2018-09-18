import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import backIcon from "../../assets/icons/arrow_left_black.svg";
import searchIcon from "../../assets/icons/search-full.svg";
import {NavLink} from "react-router-dom";
import TextInput from "../TextInput/TextInput";

const Bar = styled.div`
	height: 7vh;
	width: 100%;
	position: relative;
`;

const Container = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 12px;
`;

const Icon = styled.img`
	width: 24px;
	height: 24px;
`;

const SearchContainer = styled.div`
	flex: 5;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const inputStyle = {
	display: 'none'
};

const BackSearchActionBar = (props) =>
	<Bar>
		<Container>
			<NavLink to={props.to}>
				<Icon src={backIcon} alt="back-arrow"/>
			</NavLink>
			<SearchContainer>
				<TextInput name={"search"} placeholder={"Trouver une attraction..."} style={inputStyle}/>
				<Icon src={searchIcon}
				      alt="search"
				      onClick={props.onSearch}
				/>
			</SearchContainer>
		</Container>
	</Bar>;


BackSearchActionBar.propTypes = {
	to: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired
};

export default BackSearchActionBar;