import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SearchBar from "../../component/SearchBar";
import theme from "../../app/theme";

const SearchResultsContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: absolute;
	z-index: 2;
	width: 100%;
	height: auto;
`;

const SearchResult = styled.li`
	font-size: 0.7em;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 0;
	background-color: ${theme.colorInverse};
	box-shadow: 0px 0px 2px ${theme.lightGrey}
`;

const cities = [
	"Monaco",
	"Paris",
	"Moscow",
	"Denver",
	"Tokyo",
	"Berlin",
];

const SEARCH_RESULT_LI_CLASS_NAME = "SearchResult-li";

class CityHomeSearchBar extends React.Component {
	state = {
		searchResults : undefined,
		value: this.props.value ? this.props.value : (this.props.defaultValue ? this.props.defaultValue : "")
	};

	static propTypes = {
		onClickResult: PropTypes.func.isRequired,
	};


	componentWillMount() { document.addEventListener("click", this.blurSearchBar) }
	componentWillUnmount() { document.removeEventListener("click", this.blurSearchBar) }

	blurSearchBar = (event) => {
		if (!event.target.className.includes(SEARCH_RESULT_LI_CLASS_NAME)) {
			this.setState({searchResults: undefined})
		}
	};

	onChange = (event) => {
		const input = event.target.value;
		const matchedCities = cities.filter(city => city.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

		this.setState({
			searchResults : matchedCities,
			value: input
		});
	};


	onClickResult = (event) => {
		const value =  event.target.dataset.value;
		this.setState({
			value: value,
			searchResults: undefined
		});
		this.props.onClickResult(event);
	};

	render() {
		const {onClickResult, value, ...rest} = this.props;
		return (
			<div id="CityHomeSearchBar">
				<SearchBar
					onChange={this.onChange}
					value={this.state.value}
					onFocus={this.onFocus}
					{...rest}
				/>
				{ this.state.searchResults && (
					<SearchResultsContainer >
						{this.state.searchResults.map(result =>
							<SearchResult key={result}
							              onClick={this.onClickResult}
							              className={SEARCH_RESULT_LI_CLASS_NAME}
							              data-value={result}>
								{result}
							</SearchResult>
						)}
					</SearchResultsContainer>
				)}
			</div>
		)
	}
}

export default CityHomeSearchBar;