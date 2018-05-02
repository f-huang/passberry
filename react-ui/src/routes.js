import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import App from "./views/App"
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import PageNotFound from "./views/PageNotFound";
import Shop from "./views/Shop";

const routes = (
    <BrowserRouter>
	    <Switch>
		    <Route exact path="/" component={App}/>
		    <Route exact path="/shop" component={Shop}/>
		    <Route exact path="/sign-in" component={SignIn}/>
		    <Route exact path="/sign-up" component={SignUp}/>
	        <Route exact path="*" component={PageNotFound}/>
	    </Switch>
    </BrowserRouter>
);

export default routes