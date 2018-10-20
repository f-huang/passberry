import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Root = styled.div`
`;

const Address = styled.p`
	font-size: 12px;
`;

const ActivityAddress = ({ address }) => {
	return (
		<Root>
			<Address>
				{address.street + (address.supplement ? ' ' + address.supplement : '')}
				{', ' + address.postcode + ' ' + address.city}
			</Address>
		</Root>
	)
};

ActivityAddress.propTypes = {
	address: PropTypes.shape({
		street: PropTypes.string.isRequired,
		supplement: PropTypes.string,
		postcode: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		countryCode: PropTypes.string.isRequired
	})
};

export default ActivityAddress;