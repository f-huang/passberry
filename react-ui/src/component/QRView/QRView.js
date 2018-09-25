import React from "react";
import QRCode from "qrcode.react";
import apiCall from "../../Api";

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

const query = `
	query QrGetValue($token: String) {
		QrGetValue(token: $token)
	}
`;

const variables = {
	"token": sessionStorage.getItem("token"),
};


class QRView extends React.Component {
	state = { url: "" };

	constructor(props) {
		super(props);
		this.updateUrl = this.updateUrl.bind(this);
	}


	componentDidMount() {
		this.updateUrl().catch(() => {this.setState({ url : "" })});
	}

	updateUrl = async () => {
		const result = await apiCall(query, variables)
			.then(out => JSON.parse(out).touristData.getQrValue);
		const url = await result ?
			'localhost:3000/' + result :
			'www.google.fr';
		this.setState({url: url});
		console.log('url', url);
	};

	render() {
		return (
			<div className="QRView">
				<div className="QRView-background">
					{ this.state.url ?
						<QRCode className="QRView-code"
					        value={ this.state.url }
					        renderAs="canvas"
					        size={ QRSize }
					        style={ canvasStyle(20) }/> : <p/> }
				</div>
			</div>
		);
	}
}

export default QRView;