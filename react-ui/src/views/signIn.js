import React, { Component } from 'react';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {user: {email: "", password: ""}};
	}

	render() {
		return (
			<div className="SignIn">
				<form method="POST">
					<label htmlFor="SignIn-email">Email</label>
					<input id="SignIn-email" name="email" type="email" placeholder="example@mail.com"/>
					<label htmlFor="SignIn-password">Password</label>
					<input id="SignIn-password" name="password" type="password"/>
					<input type="submit"/>
				</form>
			</div>
		);
	}
}

export default SignIn;
