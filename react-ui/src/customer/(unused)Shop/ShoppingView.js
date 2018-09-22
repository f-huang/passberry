import React from "react";
import AttractionPreviewGrid from "../(unused)Attraction/AttractionPreviewGrid/AttractionPreviewGrid";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Button from "../../component/Button/Button";
import "./ShoppingView.css";

const api = '/graphql';

const query = `
	query AttractionGetAll {
		AttractionGetAll {
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
		attractions: [],
		editionMode: false
	};


	constructor(props) {
		super(props);
		this.updateData = this.updateData.bind(this);
		this.saveAttractions = this.saveAttractions.bind(this);
		this.addInChart = this.addInChart.bind(this);
		this.switchState = this.switchState.bind(this);
		this.switchSelect = this.switchSelect.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirm = this.onConfirm.bind(this);
	}


	componentWillMount() {
		this.setState({ attractions: this.props.cookies.get('attraction')
			|| this.updateData().catch(() => { this.setState({ attractions: [] }); })
		});
	}


	switchState = () => {
		this.setState({ editionMode: !this.state.editionMode })
	};


	saveAttractions = (attractions) => {
		this.setState({ attractions: attractions });
		this.props.cookies.set('attraction', attractions);
	};


	updateData = async () => {
		const result = await fetch(api, fetchInit())
			.then(res => res.text())
			.then(out => JSON.parse(out).touristData.getAllAttractions);
		const finalAttractions = await result.map(attraction => {
			const r = Object.assign({}, attraction);
			r.selected = false;
			r.wanted = true;
			return r;
		});
		this.saveAttractions(await finalAttractions);
	};


	addInChart = (attractionName) => {
		const i = this.state.attractions.findIndex((el) => el.name === attractionName);
		const tmp = this.state.attractions;
		tmp[i].wanted = true;
		this.saveAttractions(tmp);
	};


	switchSelect = (attractionName, value) => {
		const i = this.state.attractions.findIndex((el) => el.name === attractionName);
		const tmp = this.state.attractions;
		tmp[i].selected = value;
		this.saveAttractions(tmp);
	};


	onDelete = () => {
		const tmp = this.state.attractions.map((el) => {
			if (el.selected)
				el.wanted = false;
			el.selected = false;
			return el;
		});
		this.switchState();
		this.saveAttractions(tmp);
	};


	onConfirm = () => {
		const to = "/shopping-cart";
		this.props.history.push(to);
	};


	render() {
		return (
			<div className={"ShoppingView"}>
				{ this.state.attractions ?
					<AttractionPreviewGrid
						switchState={ this.switchState }
						switchSelect={ this.switchSelect }
						addInChart={ this.addInChart }
						editionMode={ this.state.editionMode }
						attractions={ this.state.attractions }/> : <p/> }
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