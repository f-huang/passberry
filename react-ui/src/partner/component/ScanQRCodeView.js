import React from 'react'
import QrReader from 'react-qr-reader'
import { withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";
import { connect } from "react-redux";
import { CREATE_SCAN, GET_TRAVELER_BY_QR } from "../../queries";
import moment from "moment";
import EnumScanState from "../EnumScanState";

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
			scanning: false
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
		// result = "1666e341956";
		if (result !== null && result !== undefined && this.state.scanning === false) {
			this.setState({scanning: true});
			this.props.client.query({
				query: GET_TRAVELER_BY_QR,
				variables: { qrValue: result }
			}).then(({loading, error, data}) => {
				if (loading) console.log("Loading");
				if (error) console.log("Error");
				const variables = {variables: {
					input: {
						attractionId: this.props.attractionId,
							userId: this.props.userId,
							qr: result,
							state: (data.getTravelerByQr === null ? EnumScanState.NOT_FOUND : EnumScanState.SUCCESS).value,
							timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
					}}};
				this.props.createScan(variables).then(({ data }) => {
					if (data)
						this.onSuccess(data.createScan.scan.id);
					this.setState({scanning: false});
				})
			});
		}
	};

	onSuccess = (scanId) => {
		this.props.history.push(`/scanned-profile/${scanId}`);
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
		userId: 10
	})
};


const withOptions = compose(
	withApollo,
	graphql(CREATE_SCAN, { name: 'createScan' }),
	connect(mapStateToProps, null)
);

export default withRouter(withOptions(ScanQRCodeView));