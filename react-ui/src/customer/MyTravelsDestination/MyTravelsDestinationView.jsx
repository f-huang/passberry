import React from "react";
import styled from "styled-components";
import MyTicketsView from "./tabviews/MyTicketsView";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import BackActionBar from "../../component/ActionBar/BackActionBar";
import theme from "../../app/theme";

const Root = styled.div`
	background-color: ${theme.backgroundColor};
	width: 100vw;
	height: 100vh
`;

class MyTravelsDestinationView extends React.Component {
	render() {
		return (
			<Root>
				<BackActionBar to={"/my-travels"} title={"Mes voyages"}/>
				<MyTicketsView/>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.myTravels}/>
			</Root>
		)
	}
}

export default MyTravelsDestinationView;