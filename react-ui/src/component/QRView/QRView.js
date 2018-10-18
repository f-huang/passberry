import React from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";

import "./QRView.css";

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
	static propTypes = {
		qrValue: PropTypes.string.isRequired
	};

	render() {
		return (
			<div className="QRView">
				<div className="QRView-background">
					<QRCode className="QRView-code"
					        value={ this.props.qrValue }
					        renderAs="canvas"
					        size={ QRSize }
					        style={ canvasStyle(20) }/>
				</div>
			</div>
		);
	}
}

export default (QRView);