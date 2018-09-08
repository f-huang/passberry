import React from "react";
import App from "../App";
import QRView from "../component/QRView/QRView";
import BottomNavigationBar from "../component/BottomNavigationBar/BottomNavigationBar";


class QRPage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.qr}
				title={`Mon QR code`}
				homeBtn
			>
				<QRView/>
			</App>
		);
	}
}

export default QRPage;