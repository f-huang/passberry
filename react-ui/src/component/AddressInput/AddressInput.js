import React from "react";

import TextInput from "../TextInput/TextInput";

const AddressInput = () =>
	<div className="AddressInput">
		<TextInput id="AddressInput-address" label="Address" name="streetAddress" placeholder="Street and number, P.O box"/>
		<TextInput id="AddressInput-address-supplement" label="Supplement" name="streetAddressSupplement" placeholder="Flat, suite, unit, building, floor, etc."/>
		<TextInput id="AddressInput-address-postcode" label="Postcode" name="postcode"/>
		<TextInput id="AddressInput-address-city" label="City"  name="city"/>
		<TextInput id="AddressInput-address-country" label="Country" name="country"/>
	</div>;

export default AddressInput;