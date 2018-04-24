import React, { Component } from 'react';

class SignUp extends Component {
	constructor(props) {
		super(props);
	}

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
					<label htmlFor="SignUp-gender-male">
						<input id="SignUp-gender-male" name="gender" value="M" type="radio"/>Male
					</label>
					<label htmlFor="SignUp-gender-female">
						<input id="SignUp-gender-female" name="gender" value="F" type="radio"/>Female
					</label>
					<input type="submit"/>
				</form>
			</div>
		);
	}
}

export default SignUp;
