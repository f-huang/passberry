import React from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";


const QRSize = 200;
const canvasStyle = () => {
	return {
		backgroundColor: "#FFFFFF",
		padding: "24px",
		position: "relative",
	}};

class QRCodeContainer extends React.Component {
	static propTypes = {
		qrValue: PropTypes.string.isRequired
	};

	render() {
		return (
			<QRCode className="QRView-code"
			        value={ this.props.qrValue }
			        renderAs="canvas"
			        size={ QRSize }
			        style={ canvasStyle() }/>
		);
	}
}

export default (QRCodeContainer);