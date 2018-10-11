import React from "react";
import QRCode from "qrcode.react";
import { Query } from "react-apollo";
import { connect } from "react-redux";

import "./QRView.css";
import {GET_QR_BY_TOKEN} from "../../queries";
import {TOKEN} from "../../customer/localStorageKeys";

const QRSize = 150;
const canvasStyle = (skew) => {
	return {
		backgroundColor: "#FFFFFF",
		padding: "24px",
		position: "relative",
		transform: `skewY(${skew}deg)`,
		OTransform: `skewY(${skew}deg)`,
		MozTransform: `skewY(${skew}deg)`,
		MsTransform: `skewY(${skew}deg)`,
		WebkitTransform: `skewY(${skew}deg)`,
	}};

class QRView extends React.Component {
	render() {
		const variables = { token: this.props.token };
		return (
			<div className="QRView">
				<div className="QRView-background">
					<Query query={ GET_QR_BY_TOKEN } variables={ variables }>
						{ ({ loading, error, data }) => {
							if (loading) return <p> Loading </p>;
							if (error) return <p> Error </p>;
							console.log(data);
							return (
								<QRCode className="QRView-code"
								        value={ data.getQrByToken }
								        renderAs="canvas"
								        size={ QRSize }
								        style={ canvasStyle(20) }/>
						)}}
					</Query>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return ({
		token: localStorage.getItem(TOKEN)
	});
};

export default connect(mapStateToProps)(QRView);