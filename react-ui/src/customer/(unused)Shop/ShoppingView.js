import React from "react";
import ActivityPreviewGrid from "../(unused)Activity/ActivityPreviewGrid/ActivityPreviewGrid";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Button from "../../component/Button/Button";
import "./ShoppingView.css";

const api = '/graphql';

const query = `
	query ActivityGetAll {
		ActivityGetAll {
			id
			name
			description
			price
		}
	}
`;


const fetchInit = () => ({
	mode: 'cors',
	method: 'post',
	json: true,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		"query": query,
	})
});

class ShoppingView extends React.Component {

	state = {
		activities: [],
		editionMode: false
	};


	constructor(props) {
		super(props);
		this.updateData = this.updateData.bind(this);
		this.saveActivities = this.saveActivities.bind(this);
		this.addInChart = this.addInChart.bind(this);
		this.switchState = this.switchState.bind(this);
		this.switchSelect = this.switchSelect.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
	}


	componentWillMount() {
		this.setState({ activities: this.props.cookies.get('activity')
			|| this.updateData().catch(() => { this.setState({ activities: [] }); })
		});
	}


	switchState = () => {
		this.setState({ editionMode: !this.state.editionMode })
	};


	saveActivities = (activities) => {
		this.setState({ activities: activities });
		this.props.cookies.set('activity', activities);
	};


	updateData = async () => {
		const result = await fetch(api, fetchInit())
			.then(res => res.text())
			.then(out => JSON.parse(out).touristData.getAllActivities);
		const finalActivities = await result.map(activity => {
			const r = Object.assign({}, activity);
			r.selected = false;
			r.wanted = true;
			return r;
		});
		this.saveActivities(await finalActivities);
	};


	addInChart = (attractionName) => {
		const i = this.state.activities.findIndex((el) => el.name === attractionName);
		const tmp = this.state.activities;
		tmp[i].wanted = true;
		this.saveActivities(tmp);
	};


	switchSelect = (attractionName, value) => {
		const i = this.state.activities.findIndex((el) => el.name === attractionName);
		const tmp = this.state.activities;
		tmp[i].selected = value;
		this.saveActivities(tmp);
	};


	onDelete = () => {
		const tmp = this.state.activities.map((el) => {
			if (el.selected)
				el.wanted = false;
			el.selected = false;
			return el;
		});
		this.switchState();
		this.saveActivities(tmp);
	};


	onConfirm = () => {
		const to = "/shopping-cart";
		this.props.history.push(to);
	};


	render() {
		return (
			<div className={"ShoppingView"}>
				{ this.state.activities ?
					<ActivityPreviewGrid
						switchState={ this.switchState }
						switchSelect={ this.switchSelect }
						addInChart={ this.addInChart }
						editionMode={ this.state.editionMode }
						activities={ this.state.activities }/> : <p/> }
				<div className={"ShoppingView-button"}>
					{ this.state.editionMode ?
						<Button onClick={ this.onDelete } value={"Delete"}/> :
						<Button onClick={ this.onConfirm } value={"Buy passes"}/> }
				</div>
			</div>
		);
	}
}

export default withRouter(withCookies(ShoppingView));