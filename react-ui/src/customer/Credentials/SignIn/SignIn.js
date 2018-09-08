import React, { Component } from 'react';

import TextInput from '../../../component/TextInput/TextInput';

import "./SignIn.css";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import isEmailValid from "../isEmailValid";
import {withRouter} from "react-router-dom";
import Authentication from "../../../Authentication";

class SignIn extends Component {

	state = {
		email: "",
		password: "",
		isFormValid: false
	};

	constructor(props) {
		super(props);
		this.auth = new Authentication();
		this.onSubmit = this.onSubmit.bind(this);
		if (this.auth.isLogged()) {
			this.props.history.replace('/');
		}
	}

	onSubmit = async (event) => {
		event.preventDefault();

		const result = await this.auth.signIn(
			this.state.email,
			this.state.password
		);
		if (await result) {
			this.props.history.push("/");
		}
	};

	onFormChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		this.isValid();
	};

	isValid = () => {
		const email = this.state.email;
		const password = this.state.password;
		const isValid = !!(email && password && email.length > 0 && password.length > 0 && isEmailValid(email));
		this.setState({ isFormValid: isValid });
	};


	render() {

		return (
			<div className="SignIn" onSubmit={this.onSubmit}>
				<form className="SignIn-form" method="POST" autoComplete="off">
					<TextInput id="SignIn-form-email"
					           name="email"
					           type="email"
					           onChange={this.onFormChange}
					           placeholder="Email"
					           required/>
					<TextInput id="SignIn-form-password"
					           name="password"
					           type="password"
					           onChange={this.onFormChange}
					           placeholder="Mot de passe"
					           required/>
					<p className={"SignIn-ForgotPassword"}>Mot de passe oublié</p>
					<ButtonSubmit isFormValid={ this.state.isFormValid } value={"Valider"}/>
				</form>
			</div>
		);
	}
}

export default withRouter(SignIn);
