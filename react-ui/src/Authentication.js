import jwt from 'jsonwebtoken';
import apiCall from "./Api";
import { SIGN_IN } from "./queries";
import { TOKEN } from "./customer/localStorageKeys";

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


	getToken = () => localStorage.getItem(TOKEN);
	setToken = (token) => localStorage.setItem(TOKEN, token);

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
		const user = {
			email: email,
			password: password
		};
		return apiCall(SIGN_IN, { input: user })
			.then(out => {
				console.log(out);
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