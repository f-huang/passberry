import React from "react";
import App from "../../App";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import QRView from "../../component/QRView/QRView";

import { Query } from "react-apollo";
import { connect } from "react-redux";
import { GET_QR_BY_USER_ID, GET_TRAVELERS_BY_USER_ID} from "../../queries";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

class QRPage extends React.Component {
	render() {
		return (
			<App
				itemSelected={BottomNavigationBar.items.qr}
				title={`Mon QR code`}
				homeBtn
			>
				<Query query={ GET_TRAVELERS_BY_USER_ID } variables={{ userId: this.props.userId }}>
					{ ({ loading, error, data} ) => {
						if (loading) return <p> Loading </p>;
						if (error) return <p> Error </p>;
						const travelers = data.getTravelersByUserId;
						return (
							<Tabs>
								<TabList>
									{travelers.map(traveler =>
										<Tab key={'tab'+traveler.id}>{ traveler.firstName }</Tab>
									)}
								</TabList>
								{travelers.map(traveler =>
									<TabPanel key={'panel'+traveler.id}>
										<Query query={ GET_QR_BY_USER_ID } variables={{ userId: traveler.id }}>
											{ ({ loading, error, data }) => {
												if (loading) return <p> Loading </p>;
												if (error) return <p> Error </p>;
												console.log(data);
												return <QRView qrValue={ data.getQrByUserId }/>;
											}}
										</Query>
									</TabPanel>
								)}

							</Tabs>
						);
					}}
				</Query>
			</App>
		);
	}
}

const mapStateToProps = state => {
	return ({
		userId: 1
	});
};

export default connect(mapStateToProps)(QRPage);