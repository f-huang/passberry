import React from "react";
import CityHomeButton from "./CityHomeButton";
import colors from "../../app/theme";
import styled from "styled-components";
import Carousel from "../../component/Carousel/Carousel";

//To delete
import monacoImg from "../../assets/monaco.jpg";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import Error404 from "../../Error404";
import CityHomeSearchBar from "./CityHomeSearchBar";
import PassInputsHandler from "../Pass/PassInputsHandler";


const style = {
	topBtn : {
		color: colors.colorPrimary,
	},
	bottomBtn : {
		color: colors.colorSecondary,
	}
};

const PageContainer = styled.div`
	z-index: 1;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px 0;
`;

const carouselItems = [
	{name: "Monaco", image: monacoImg},
	{name: "Monaco", image: monacoImg},
];


//TODO :
// - Check if the url param :location is correct.

class CityHomePage extends React.Component {

	state = {
		isLocationCorrect: true,
		isSearchingCity: false
	};

	constructor(props) {
		super(props);
		this.passHandler = new PassInputsHandler();
		this.buttons = [
			{text: "Séjour planifié", onClick: this.onClickJourneyPlanned},
			{text: "Séjour personnalisé", onClick: this.onClickJourneyCustomize}
		];
		this.location = this.props.match.params.city.toLocaleLowerCase();
	}


	onClickJourneyPlanned = (props) => {
		props.history.push(`/${this.location}/pass/vuego-made`);
	};

	onClickJourneyCustomize = (props) => {
		props.history.push(`/${this.location}/pass/customize`);
	};

	onClickResult = (event) => {
		const cityResult = event.target.dataset.value.toLocaleLowerCase();
		this.passHandler.saveCity(cityResult);
		this.props.history.push(`/${cityResult}`);
		this.location = cityResult;

	};

	render() {
		if (!this.state.isLocationCorrect)
			return (<Error404/>);
		return (
			<div id="CityHomePage">
				<CityHomeSearchBar
					value={this.location.charAt(0).toUpperCase() + this.location.slice(1) }
					onClickResult={this.onClickResult}
				/>
				<PageContainer>
					<Carousel items={carouselItems}/>
					<ButtonsContainer>
						{ this.buttons.map(button =>
							<CityHomeButton
								theme={style.topBtn}
								value={button.text}
								onClick={() => button.onClick(this.props)}
								key={button.text}
							/>
						)}
					</ButtonsContainer>
					<ButtonsContainer>
						<CityHomeButton theme={style.bottomBtn} value={"Découvrir la destination"}/>
					</ButtonsContainer>
				</PageContainer>
				<BottomNavigationBar itemSelected={ BottomNavigationBar.items.currentTrip }/>
			</div>
		);
	}
}

export default CityHomePage;