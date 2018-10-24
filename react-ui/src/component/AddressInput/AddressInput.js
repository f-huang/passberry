import React from "react";

import TextInput from "../TextInput/TextInput";

const AddressInput = (props) =>
	<div className="AddressInput">
		<TextInput id="AddressInput-address" label="Address" name="street" placeholder="Street and number, P.O box" {...props}/>
		<TextInput id="AddressInput-address-supplement" label="Supplement" name="supplement" placeholder="Flat, suite, unit, building, floor, etc." {...props} required={false}/>
		<TextInput id="AddressInput-address-postcode" label="Postcode" name="postcode" {...props}/>
		<TextInput id="AddressInput-address-city" label="City"  name="city" {...props}/>
		<TextInput id="AddressInput-address-country" label="Country" name="country" {...props}/>
	</div>;

export default AddressInput;