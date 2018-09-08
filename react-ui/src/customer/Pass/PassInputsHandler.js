import Authentication from "../../Authentication";

const KEY_TOURISTS = "tourists";
const KEY_VUEGO_NUMBER_OF_DAYS = "vuegoNumberOfDays";
const KEY_START_DATE = "tripStartDate";
const KEY_CITY = "city";

const setCookie = (key, value) =>
	localStorage.setItem(key, value);

const getCookie = (key) =>
	localStorage.getItem(key);

export default class PassInputsHandler {

	static passTypes = ['vuego-made', 'customized'];

	vuegoPassNumberOfDays = [
		{id: 'oneDay', value: 1},
		{id: 'twoDays', value: 2}
	];

	constructor() {
		this.auth = new Authentication();
	}

	saveUsers = (tourists) => {
		setCookie(KEY_TOURISTS, JSON.stringify(tourists));
	};

	getUsers = () => {
		const tourists = getCookie(KEY_TOURISTS);
		if (tourists)
			return JSON.parse(tourists);
		else if (this.auth.isLogged()) {
			return this.auth.getUser().then(user =>
				[{
					name: user ? user.firstName : "",
					birthdate: user && user.birthdate ? user.birthdate : "",
					status: user && user.status ? user.status : ""
				}]
			);
		}
		else
			return undefined;
	};

	getNumberOfUsers = () => {
		const tourists = getCookie(KEY_TOURISTS);
		if (tourists)
			return (JSON.parse(tourists).length);
		else if (this.auth.isLogged())
			return (1);
		else
			return (0);
	};

	saveCity = (city) => setCookie(KEY_CITY, city);
	getCity = () => getCookie(KEY_CITY);

	saveAttractions = () => {

	};

	saveStartDate = (date) => {
		localStorage.setItem(KEY_START_DATE, JSON.stringify(date));
	};

	saveVuegoPassNumberOfDays = (id) => {
		const value = this.vuegoPassNumberOfDays.find(obj => obj.id === id).value;
		setCookie(KEY_VUEGO_NUMBER_OF_DAYS, value);
	};

	getVuegoPassNumberOfDays = () => {
		let nDays = getCookie(KEY_VUEGO_NUMBER_OF_DAYS);
		if (nDays)
			nDays = parseInt(nDays);
		return nDays;
	}

}