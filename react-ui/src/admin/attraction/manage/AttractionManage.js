import React from "react";
import apiCall from "../../../api";


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

class AttractionManage extends React.Component {
	state = { attractions: [] };
	constructor(props){
		super(props);
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
		 this.updateData().catch(() => {
		 	this.setState({ attractions: [] });
		 });
	}

	updateData = async () => {
		const result =  await apiCall(query, null)
			.then(out => JSON.parse(out).data.getAllAttractions);
		this.setState({ attractions: await result });
	};

	render() {
		return (
			<div className={"AttractionManage"}>
				<ul>
					{
						this.state.attractions.map((attraction, i) =>
							<li key={i}>{attraction.name}</li>
					)}
				</ul>
			</div>
		);
	}
}

export default AttractionManage;