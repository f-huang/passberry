const api = "/graphql";

const apiCall = (query, variables) => {
	return fetch(api, {
		mode: 'cors',
		method: 'post',
		json: true,
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"query": query,
			"variables": variables,
		})
	}).then(res => res.text());
};

export default apiCall;