import React from "react";
import App from "../../App";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import {GET_USER_TRAVELS} from "../../queries";
import ListTravels from "./components/ListTravels";

class MyTravelsView extends React.Component {
	render() {
		return (
			<App itemSelected={BottomNavigationBar.items.myTravels} title={"Mes voyages"} homeBtn>
				<Query query={ GET_USER_TRAVELS } variables={{ userId: 1 }}>
					{ ({ loading, error, data}) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						const travels = data.getUserTravels;
						if (travels.length === 0)
							return <p>{"Aucun voyage"}</p>;
						else {
							return <ListTravels travels={travels}/>;
						}
					}}
				</Query>
			</App>
		)
	}
}

const mapStateToProps = state => ({
	userId: 1
});

export default connect(mapStateToProps)(MyTravelsView);