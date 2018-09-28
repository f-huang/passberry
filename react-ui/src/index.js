import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { reducer } from "./reducers";
import registerServiceWorker from './registerServiceWorker';
import gql from "graphql-tag";

import "./app/base.css";
import routes from './routes'

const client = new ApolloClient({
	// By default, this client will send queries to the
	//  `/graphql` endpoint on the same host
	// Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
	// to a different host
	link: new HttpLink(),
	cache: new InMemoryCache(),
});

const store = createStore(reducer);

const root =
	<ApolloProvider client={ client }>
		<ReduxProvider store={ store }>
			<CookiesProvider>{ routes }</CookiesProvider>
		</ReduxProvider>
	</ApolloProvider>;


// store.subscribe(() => console.log(store.getState()));
ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();

client.query({query: gql`
      {
        getUserById(id: 1) {
          id
          email
        }
      }
    `
}).then(result => console.log(result));