import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../app/theme";
import iconSearch from "../assets/icons/search-empty.svg";
import iconClear from "../assets/icons/cross_grey.svg";

const Bar = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	align-items: center;
	height: 48px;
`;

const Icon = styled.img`
	width: 24px;
	height: 24px;
	padding: 8px;
	cursor: ${props => props.onClick || props.isClickable ? "pointer" : "none"};
`;

const Input = styled.input`
	-webkit-appearance: none;
	-moz-appearance: none;
	border: none;
	width: 100%;
	height: 70%;
	
	&:focus {
		outline: none;
	}
	
	&::placeholder, &::-webkit-input-placeholder {
		color: ${theme.lightGrey};
	}
`;

class SearchBar extends React.Component {
	static propTypes = {
		placeholder: PropTypes.string,
	};
	static defaultProps = {
		placeholder: "Type here",
	};

	state = {
		value: this.props.value ? this.props.value : ((this.props.defaultValue) ? this.props.defaultValue : "")
	};

	componentWillReceiveProps(props) {
		if (props.value)
			this.setState({value : props.value});
	}

	clear = (event) => {
		this.setState({value: ""});
		event.target.value = "";
		this.onChangeInput(event);
	};

	onChangeInput = (event) => {
		this.setState({value : event.target.value});
		if (this.props.onChange)
			this.props.onChange(event);
	};

	render() {
		const {style, value, defaultValue, onChange, ...rest} = this.props;
		return (
			<Bar style={style}>
				<Icon src={iconSearch} alt="search-icon"/>
				<Input
					maxLength={126}
					onChange={this.onChangeInput}
					value={this.state.value}
					{... rest}
				/>
				{this.state.value &&
				<Icon src={iconClear} alt="clear-icon" onClick={this.clear}/>
				}
			</Bar>
		);
	}
}

export default SearchBar;
