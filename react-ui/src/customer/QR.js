import React from "react";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";
import AppBar from "../component/AppBar/AppBar";
import QRView from "../component/QRView/QRView";

class QR extends React.Component {
	render() {
		return (
			<div className="QR" style={{height: "100%"}}>
				<AppBar title="QR Scan"/>
				<QRView/>
				<BottomNavigationBar itemSelected="QR"/>
			</div>
		);
	}
}

export default QR;