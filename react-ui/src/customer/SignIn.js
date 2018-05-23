import React, { Component } from 'react';

import TextInput from '../component/TextInput/TextInput';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {user: {email: "", password: ""}};
	}

	render() {
		return (
			<div className="SignIn">
				<form className="SignIn-form" method="POST">
					<TextInput id="SignIn-form-email"
					           name="email"
					           type="email"
					           label="Email"
					           placeholder="example@mail.com"/>
					<TextInput id="SignIn-form-password"
					           name="password"
					           type="password"
					           label="Password"/>
					<input className="SignIn-form-submit" type="submit"/>
				</form>
			</div>
		);
	}
}

export default SignIn;
