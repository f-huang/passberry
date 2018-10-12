import React from 'react'
import QrReader from 'react-qr-reader'
import { withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import {GET_TICKET_BY_QR_AND_ATTRACTION_ID, GET_TRAVELER_BY_QR} from "../../queries";

const styles = {
	searchBar: {

	},
	camera: {
		width: "100vw",
		height: "auto",
	}
};

class ScanQRCodeView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: false,
			ticket: null,
			qrValue: null,
		};
	}

	componentDidMount() {
		const constraints = { audio: false, video: {width: 800, height: 600 }};
		const getUserMedia = (params) => (
			new Promise((successCallback, errorCallback) => {
				navigator.mediaDevices.getUserMedia.call(navigator, params, successCallback, errorCallback);
			})
		);
		getUserMedia(constraints)
			.then((stream) => {
				const vendorURL = window.URL || window.webkitURL;
				this.video.src = vendorURL.createObjectURL(stream);
			})
			.catch((err) => {
				this.onError(err);
			});
	}

	onScan = (result) => {
		// result = "16662a89a1e";
		if (result !== null) {
			if (result !== undefined && result != null) {
					this.props.client.query({
						query: GET_TRAVELER_BY_QR,
						variables: { qrValue: result }
					}).then(({loading, error, data}) => {
						if (loading) console.log("Loading");
						if (error) console.log("Error");
						// this.onSuccess(data.getTravelerByQr.id);
					});
				}
			}
	};

	onSuccess = (profileId) => {
		this.props.history.push(`/scanned-profile/${profileId}`);
	};

	onError = (error) => {
		this.setState({error: "An error occurred : " + error});
	};

	render() {
		return (
			<div className="ScanQRCodeView">
				<div className="ScanQRCodeView-searchBar">
				</div>
				<div className="ScanQRCodeView-camera" style={styles.camera}>
					<QrReader className="ScanQRCodeView-camera-qr"
					          ref={(ref) => this.video = ref}
					          delay={ 100 }
					          facingMode="environment"
					          onScan={this.onScan}
					          onError={this.onError}
					/>
					{ this.state.error ? <p>{ this.state.error }</p> : "" }
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		attractionId: 1,
	})
};


const withOptions = compose(
	withApollo,
	connect(mapStateToProps, null)
);

export default withRouter(withOptions(ScanQRCodeView));