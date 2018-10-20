import React from "react";
import apiCall from "../../../Api";


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

class ActivityManage extends React.Component {
	state = { activities: [] };
	constructor(props){
		super(props);
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
		 this.updateData().catch(() => {
		 	this.setState({ activities: [] });
		 });
	}

	updateData = async () => {
		const result =  await apiCall(query, null)
			.then(out => JSON.parse(out).data.getAllActivities);
		this.setState({ activities: await result });
	};

	render() {
		return (
			<div className={"ActivityManage"}>
				<ul>
					{
						this.state.activities.map((activity, i) =>
							<li key={i}>{activity.name}</li>
					)}
				</ul>
			</div>
		);
	}
}

export default ActivityManage;