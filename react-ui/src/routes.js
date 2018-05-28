import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

//COMPONENTS
import App from "./views/App"
import SignIn from "./customer/SignIn";
import SignUp from "./customer/SignUp";
import PageNotFound from "./views/PageNotFound";
import Shop from "./customer/Shop";
import QR from "./customer/QR";
import Pass from "./customer/Pass";
import Profile from "./customer/Profile";
import PartnerScanPass from "./partner/PartnerScanPass";
import PartnerSeeUser from "./partner/PartnerSeeUser";
import AddProductDescription from "./admin/pass/AddProductDescription";


const routes = (
    <BrowserRouter>
	    <Switch>
		    <Route exact path="/" component={App}/>
		    <Route exact path="/shop" component={Shop}/>
		    <Route exact path="/qr" component={QR}/>
		    <Route exact path="/qr-scan" component={PartnerScanPass}/>
		    <Route exact path="/partner-see-customer" component={PartnerSeeUser}/>
		    <Route exact path="/pass" component={Pass}/>
		    <Route exact path="/profile" component={Profile}/>
		    <Route exact path="/sign-in" component={SignIn}/>
		    <Route exact path="/sign-up" component={SignUp}/>
		    <Route exact path="/admin-add-activity" component={AddProductDescription}/>
	        <Route exact path="*" component={PageNotFound}/>
	    </Switch>
    </BrowserRouter>
);

export default routes