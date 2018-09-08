import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import "./app/base.css";
import routes from './routes'
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
	// By default, this client will send queries to the
	//  `/graphql` endpoint on the same host
	// Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
	// to a different host
	link: new HttpLink(),
	cache: new InMemoryCache(),
});
const root =
	<ApolloProvider client={ client }>
		<CookiesProvider>{ routes }</CookiesProvider>
	</ApolloProvider>;

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
