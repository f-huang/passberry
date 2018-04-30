import React, { Component } from 'react';

class SignUp extends Component {
	render() {
		return (
			<div className="SignUp">
				<form method="POST">
					<label htmlFor="SignUp-email">Email</label>
					<input id="SignUp-email" name="email" type="email" placeholder="example@mail.com"/>
					<br />
					<label htmlFor="SignUp-firstName">First Name</label>
					<input id="SignUp-firstName" name="firstName" type="text"/>
					<br />
					<label htmlFor="SignUp-lastName">Last Name</label>
					<input id="SignUp-lastName" name="lastName" type="text"/>
					<br />
					<label htmlFor="SignUp-password">Password</label>
					<input id="SignUp-password" name="password" type="password"/>
					<br />
					<label htmlFor="SignUp-date-of-birth">Date of birth</label>
					<input id="SignUp-date-of-birth" name="dateOfBirth" type="text"/>
					<br />
					<label htmlFor="SignUp-gender-male">
						<input id="SignUp-gender-male" name="gender" value="M" type="radio"/>Male
					</label>
					<label htmlFor="SignUp-gender-female">
						<input id="SignUp-gender-female" name="gender" value="F" type="radio"/>Female
					</label>
					<br />
					<label htmlFor="SignUp-address">Street address</label>
					<input id="SignUp-address-street" name="streetAddress" type="text" placeholder="Street and number, P.O box"/>
					<br />
					<input id="SignUp-address-supplement" name="streetAddressSupplement" type="text" placeholder="Flat, suite, unit, building, floor, etc."/>
					<br />
					<label htmlFor="SignUp-address-postcode">Postcode</label>
					<input id="SignUp-address-postcode" name="postcode" type="text"/>
					<br />
					<label htmlFor="SignUp-address-city">Town/City</label>
					<input id="SignUp-address-city" name="city" type="text"/>
					<br />
					<label htmlFor="SignUp-address-country">Country</label>
					<input id="SignUp-address-country" name="country" type="text"/>
					<br />
					<input type="submit"/>
				</form>
			</div>
		);
	}
}

export default SignUp;
