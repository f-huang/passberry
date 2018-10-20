import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from "apollo-link-context";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { reducer } from "./reducers";
import { TOKEN } from "./customer/localStorageKeys";

import registerServiceWorker from './registerServiceWorker';

import "./app/base.css";
import routes from './routes'
import InitComponent from "./customer/InitComponent";

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

const store = createStore(reducer);

const root =
	<ApolloProvider client={ client }>
		<ReduxProvider store={ store }>
			<CookiesProvider>
				<InitComponent/>
				{ routes }
			</CookiesProvider>
		</ReduxProvider>
	</ApolloProvider>;


// store.subscribe(() => console.log(store.getState()));
ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();