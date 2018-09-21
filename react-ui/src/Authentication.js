import jwt from 'jsonwebtoken';
import apiCall from "./api";

const KEY_TOKEN = "token";

const queryUser = `
	query UserGet($id: ID!) {
		UserGet(id: $id) {
			first_name
			last_name
			birthdate
		}
	}
`;

export default class Authentication {


	getToken = () => localStorage.getItem(KEY_TOKEN);
	setToken = (token) => localStorage.setItem(KEY_TOKEN, token);

	isLogged() {
		const token = this.getToken();
		return !!token || this.isTokenExpired(token);
	}

	getUser() {
		const token = this.getToken();
		try {
			const decodedToken = jwt.decode(token);
			return apiCall(queryUser, {"id": decodedToken.id})
				.then (out => {
					const json = JSON.parse(out).data.getUserById;
					return {
						email: decodedToken.email,
						id: decodedToken.id,
						firstName: json.first_name,
						lastName: json.last_name,
						birthdate: json.birthdate
					};
				});
		}
		catch (err) {
			return null;
		}
	}

	signIn(email, password) {
		const querySignIn = `
			mutation signIn($user: UserSigningIn) {
				signIn(user: $user) {
					token
					message
					code
				}
			}
		`;
		const user = {
			"email": email,
			"password": password
		};
		return apiCall(querySignIn, { "user": user })
			.then(out => {
				const json = JSON.parse(out).data.signIn;
				if (json.token) {
					this.setToken(json.token);
					return true;
				}
				else
					return false;
			});
	}

	isTokenExpired() {
		const token = this.getToken();
		try {
			const decodedToken = jwt.decode(token);
			return decodedToken.exp < Date.now() / 1000;
		}
		catch (err) {
			return false;
		}
	}

};