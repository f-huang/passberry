import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './views/app'
import SignIn from './views/signIn';
import SignUp from './views/signUp';
import PageNotFound from './views/pageNotFound';

const routes = (
    <BrowserRouter>
	    <Switch>
            <Route exact path="/" component={App}/>
		    <Route exact path="/sign-in" component={SignIn}/>
		    <Route exact path="/sign-up" component={SignUp}/>
	        <Route exact path="*" component={PageNotFound}/>
	    </Switch>
    </BrowserRouter>
);

export default routes