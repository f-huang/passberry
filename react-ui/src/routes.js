import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './views/app'
import SignIn from './views/signIn';
import PageNotFound from './views/pageNotFound';
// import MyPasses from '../../src/user/UserMyPasses'
// import PartnerSeeUser from '../../src/partner/PartnerSeeUser'
// import ScanPass from '../../src/partner/PartnerScanPass'

const routes = (
    <BrowserRouter>
	    <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/sign-in" component={SignIn}/>
	        <Route exact path="*" component={PageNotFound}/>
            {/*<Route exact path="/partner-scan-pass" component={ScanPass}/>*/}
            {/*<Route exact path="/partner-see-user" component={PartnerSeeUser}/>*/}
	    </Switch>
    </BrowserRouter>
);

export default routes