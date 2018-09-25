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

class Api {
	static getAttractions = () => {
		const query = `
			query getAllAttractions($getAllAttractions: Int) {
			  getAllAttractions(limit: $getAllAttractions) {
			    id
			    name
			    link
			    description
			    price {
			      adult
			      child
			      maxAgeForChild
			    }
			    type
			  }
			}
		`;
		apiCall(query, null).then(out => {
			const ret = JSON.parse(out);
			if (ret.errors) {
				console.log("errors : ", ret.errors);
			}
			if (ret.data) {
				return ret.data.getAllAttractions
			} else {
				return null;
			}
		})
	}
}

export default apiCall;