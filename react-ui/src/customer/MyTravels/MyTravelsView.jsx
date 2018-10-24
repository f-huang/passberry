import React from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import {GET_USER_TRAVELS} from "../../queries";
import ListTravels from "./components/ListTravels";
import LoadingView from "../../component/LoadingView/LoadingView";
import BackActionBar from "../../component/ActionBar/BackActionBar";

class MyTravelsView extends React.Component {
	render() {
		return (
			<div>
				<BackActionBar title={"Mes voyages"} to={"/"}/>
				<Query query={ GET_USER_TRAVELS } variables={{ userId: this.props.userId }}>
					{ ({ loading, error, data}) => {
						if (loading) return <LoadingView/>;
						if (error) return <p>Error</p>;
						const travels = data.getUserTravels;
						if (travels.length === 0)
							return <p>{"Aucun voyage"}</p>;
						else {
							return <ListTravels travels={travels}/>;
						}
					}}
				</Query>
				<BottomNavigationBar itemSelected={BottomNavigationBar.items.myTravels}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	userId: 1
});

export default connect(mapStateToProps)(MyTravelsView);