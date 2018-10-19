import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_QR_BY_USER_ID } from "../../../queries";
import QRCodeContainer from "../../../component/QRCodeContainer/QRCodeContainer";

const TravelerQRCode = ({ travelerId }) => {
	return (
		<Query query={ GET_QR_BY_USER_ID } variables={{ userId: travelerId }}>
			{ ({ loading, error, data }) => {
				if (loading) return <p> Loading </p>;
				if (error) return <p> Error </p>;

				if (data.getQrByUserId)
					return <QRCodeContainer qrValue={ data.getQrByUserId }/>;
				else
					return <div/>;
			}}
		</Query>
	);
};

TravelerQRCode.propTypes = {
	travelerId: PropTypes.string.isRequired
};

export default TravelerQRCode;