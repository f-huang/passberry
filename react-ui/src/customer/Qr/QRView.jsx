import React from "react";
import styled from "styled-components";

import { Query } from "react-apollo";
import { connect } from "react-redux";
import { GET_TRAVELERS_BY_USER_ID} from "../../queries";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import App from "../../App";
import BottomNavigationBar from "../../component/BottomNavigationBar/BottomNavigationBar";
import TravelerQRCode from "./components/TravelerQRCode";

import "react-tabs/style/react-tabs.css";
import theme from "../../app/theme";
import LoadingView from "../../component/LoadingView/LoadingView";

const Root = styled.div`
	background-color: ${theme.backgroundColor};
	width: 100vw;
	height: 100%;
`;

const QRContainer = styled.div`
	background-color: ${theme.colorInverse};
	width: 100%;
	position: absolute;
	top: 20%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 24px;
`;

class QRView extends React.Component {
	render() {
		return (
			<App itemSelected={BottomNavigationBar.items.qr} title={`Mon QR code`} homeBtn>
				<Query query={ GET_TRAVELERS_BY_USER_ID } variables={{ userId: this.props.userId }}>
					{ ({ loading, error, data} ) => {
						if (loading) return <LoadingView/>;
						if (error) return <p> Error </p>;
						const travelers = data.getTravelersByUserId;
						return (
							<Root>
								<Tabs>
									<TabList>
										{travelers.map(traveler =>
											<Tab key={'tab'+traveler.id}>{ traveler.firstName }</Tab>
										)}
									</TabList>
									{travelers.map(traveler =>
										<QRContainer>
											<TabPanel key={'panel'+traveler.id}>
												<TravelerQRCode travelerId={traveler.id}/>
											</TabPanel>
										</QRContainer>
									)}

								</Tabs>
							</Root>
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

export default connect(mapStateToProps)(QRView);