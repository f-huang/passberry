import React from "react";
import { withApollo } from "react-apollo";
import { connect } from "react-redux";
import { GET_ALL_ACTIVITIES } from "../queries";
import {initActivities, updateLastTimeFetched} from "../initActions";
import moment from "moment";

const currentTime = moment();

class InitComponent extends React.Component {
	constructor(props) {
		super(props);
		this.storeActivities = this.storeActivities.bind(this);
	}

	componentWillMount() {
		if (this.props.lastTimeFetched) {
			const expirationTIme = moment(this.props.lastTimeFetched).add(1, 'hours');
			if (expirationTIme.isAfter(currentTime))
				this.storeActivities();
		}
		else
			this.storeActivities();
	}

	storeActivities = () => {
		this.props.client.query({
			query: GET_ALL_ACTIVITIES,
		}).then(({loading, error, data}) => {
			if (data && data.getAllActivities) {
				this.props.storeActivities(data.getAllActivities);
				this.props.updateLastTimeFetched();
			}
		})
	};

	render() {
		return (
			<div/>
		)
	}
}

const mapStateToProps = state => ({
	lastTimeFetched: state.lastTimeFetched
});

const mapDispatchToProps = dispatch => ({
	storeActivities: (activities) => dispatch(initActivities(activities)),
	updateLastTimeFetched: () => dispatch(updateLastTimeFetched(currentTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(InitComponent));