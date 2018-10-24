import React from "react";
import moment from "moment";
import { ApolloClient } from "apollo-client/index";
import { ApolloProvider, withApollo } from "react-apollo";
import { CookiesProvider } from "react-cookie";
import { Provider as ReduxProvider, connect } from "react-redux";
import { createUploadLink } from "apollo-upload-client/lib/index";
import { reducers } from "./reducers";
import { createStore } from "redux";
import { ACTIVITIES, LAST_TIME_FETCHED, TOKEN } from "./customer/localStorageKeys";
import { InMemoryCache } from "apollo-cache-inmemory/lib/index";
import { setContext } from "apollo-link-context/lib/index";
import { GET_ALL_ACTIVITIES } from "./queries";
import routes from "./routes";

import "./app/base.css";
import LoadingView from "./component/LoadingView/LoadingView";

const currentTime = moment();

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(TOKEN);
	return {
		headers: {
			...headers,
			authorization: `Bearer ${token}` || ""
		}
	}
});

const client = new ApolloClient({
	// By default, this client will send queries to the
	//  `/graphql` endpoint on the same host
	// Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
	// to a different host
	// link: authLink.concat(createUploadLink()),
	link: createUploadLink(),
	cache: new InMemoryCache(),
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

const store = createStore(reducers);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true };
		this.lastTimeFetched = localStorage.getItem(LAST_TIME_FETCHED);
		if (this.lastTimeFetched)
			this.lastTimeFetched = JSON.parse(this.lastTimeFetched);
		this.storeActivities = this.storeActivities.bind(this);
	}

	storeActivities = () => {
		client.query({
			query: GET_ALL_ACTIVITIES,
		}).then(({loading, error, data}) => {
			if (data && data.getAllActivities) {
				this.setState({ isLoading: false });
				localStorage.setItem(LAST_TIME_FETCHED, JSON.stringify(moment()));
				localStorage.setItem(ACTIVITIES, JSON.stringify(data.getAllActivities));
			}
		})
	};

	componentDidMount() {
		if (this.lastTimeFetched) {
			const expirationTime = moment(this.lastTimeFetched).add(10, 'minutes');
			if (expirationTime.isAfter(currentTime))
				this.storeActivities();
			else
				this.setState({ isLoading: false })
		}
		else
			this.storeActivities();
	}

	render() {
		if (this.state.isLoading)
			return <LoadingView/>;
		else
			return (
				<ApolloProvider client={client}>
					<ReduxProvider store={store}>
						<CookiesProvider>
							{routes}
						</CookiesProvider>
					</ReduxProvider>
				</ApolloProvider>
			);
	}
}

export default (App);
