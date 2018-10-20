import React from "react";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { GET_ALL_ACTIVITIES } from "../queries";
import { initActivities } from "../initActions";

class InitComponent extends React.Component {
	constructor(props) {
		super(props);
		this.storeActivities = this.storeActivities.bind(this);
	}

	componentWillMount() {
		this.storeActivities();
	}

	storeActivities = () => {
		this.props.client.query({
			query: GET_ALL_ACTIVITIES,
		}).then(({loading, error, data}) => {
			if (data && data.getAllActivities) {
				this.props.storeActivities(data.getAllActivities);
			}
		})
	};

	render() {
		return (
			<div/>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	storeActivities: (activities) => dispatch(initActivities(activities))
});

export default connect(null, mapDispatchToProps)(withApollo(InitComponent));