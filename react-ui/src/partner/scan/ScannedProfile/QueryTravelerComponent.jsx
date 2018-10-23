import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { setTraveler } from "../scanActions";
import { GET_USER_BY_SCAN_ID } from "../../../queries";
import LoadingView from "../../../component/LoadingView/LoadingView";


const QueryTravelerComponent = ({ scanId, setTraveler }) => {
	return (
		<Query query={GET_USER_BY_SCAN_ID} variables={{ scanId }}>
			{({ loading, error, data }) => {
				if (loading) return <LoadingView/>;
				if (error) return <div>Error ticket</div>;
				if (data && data.getUserByScanId) {
					setTraveler(data.getUserByScanId);
				}
				return <div/>;
			}}
		</Query>
	);
};

QueryTravelerComponent.propTypes = {
	scanId: PropTypes.string.isRequired
};


const mapDispatchToProps = dispatch => {
	return ({
		setTraveler: (traveler) => dispatch(setTraveler({ traveler }))
	});
};

export default connect(null, mapDispatchToProps)(QueryTravelerComponent);