import React, { Component } from 'react';

import TextInput from "../../../component/TextInput/TextInput";
import apiCall from "../../../api";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import AppBar from "../../../component/AppBar/AppBar";
import moment from "moment";

const query = `
	mutation signUp($user: UserSigningUp) {
		signUp(user: $user) {
			token
			message
			code
		}
	}
`;


class SignUp extends Component {


	constructor(props) {
		super(props);
		this.state = {
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			birthdate: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit = event => {
		const date = moment(this.state.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
		const user =  {
			"mail": this.state.email,
			"first_name": this.state.firstName,
			"last_name": this.state.lastName,
			"password": this.state.password,
			"gender": this.inputGender.value,
			"birthdate": date
		};
		console.log(user);
		event.preventDefault();
		apiCall(query, { "user": user })
			.then(out => {
				console.log(out);
				const json = JSON.parse(out).data.signUp;
				console.log(json);
				localStorage.setItem("token", json.token);
			});
	};

	onFormChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		return (
			<div>
				<AppBar title={"S'inscrire"} homeBtn backBtn/>
				<div className="SignUp">
					<form method="POST" onSubmit={this.onSubmit}>
						<TextInput id="SignUp-email"
						           label="Email"
						           name="email"
						           type="email"
						           onChange={this.onFormChange}
						           placeholder="example@mail.com"
						/>
						<TextInput id="SignUp-firstName"
						           label="First Name"
						           name="firstName"
						           onChange={this.onFormChange}
						/>
						<TextInput id="SignUp-lastName"
						           label="Last Name"
						           name="lastName"
						           onChange={this.onFormChange}
						/>
						<TextInput id="SignUp-password"
						           label="Password"
						           name="password"
						           type="password"
						           onChange={this.onFormChange}
						/>
						<TextInput id="SignUp-birthdate"
						           label="Birthdate"
						           name="birthdate"
						           onChange={this.onFormChange}
						/>
						<label htmlFor="SignUp-gender-male">
							<input id="SignUp-gender-male"
							       ref={input => this.inputGender = input}
							       name="gender"
							       value="M"
							       type="radio"/>Male
						</label>
						<label htmlFor="SignUp-gender-female">
							<input id="SignUp-gender-female"
							       ref={input => this.inputGender = input}
							       name="gender"
							       value="F"
							       type="radio"
							/>Female
						</label>
						<br />
						<ButtonSubmit value={"Valider"}/>
					</form>
				</div>
			</div>
		);
	}
}


export default SignUp;
