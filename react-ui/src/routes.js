import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

//COMPONENTS
import SignUp from "./customer/Credentials/SignUp/SignUp";
import Login from "./customer/Credentials/Login";
import QRPage from "./customer/Qr/QRView";
import ProfilePage from "./customer/ProfilePage";
import ParametersPage from "./customer/ParametersPage";
import Error404 from "./Error404";
import Activity from "./customer/Activity/ActivityView";
import ActivityCreateView from "./admin/activity/create/ActivityCreateView";
import ActivityManage from "./admin/activity/manage/ActivityManage";
import TravelView from "./customer/Travel/TravelView";
import BasketView from "./customer/Basket/BasketView";
import PaymentView from "./customer/Payment/PaymentView";
import MyTravelsView from "./customer/MyTravels/MyTravelsView";
import MyTravelsDestinationView from "./customer/MyTravelsDestination/MyTravelsDestinationView";
import ScanProfileView from "./partner/scan/ScanProfileView";
import ScannedProfileView from "./partner/scan/ScannedProfile/ScannedProfileView";
import Destination from "./customer/DestinationOffers/DestinationView";

const routes = (
    <BrowserRouter forceRefresh={true}>
	    <Switch>
		    <Route exact path="/" component={TravelView}/>
		    <Route exact path="/admin-add-activity" component={ActivityCreateView}/>
		    <Route exact path="/admin-manage-activity" component={ActivityManage}/>
		    <Route exact path="/profile" component={ProfilePage}/>
		    <Route exact path="/parameters" component={ParametersPage}/>
		    <Route exact path="/my-travels" component={MyTravelsView}/>
		    <Route exact path="/my-travels/details" component={MyTravelsDestinationView}/>
		    <Route exact path="/qr" component={QRPage}/>
		    <Route exact path="/login" component={Login}/>
		    <Route exact path="/sign-up" component={SignUp}/>
		    <Route exact path="/basket" component={BasketView}/>
		    <Route exact path="/payment" component={PaymentView}/>
		    <Route exact path="/scan-profile" component={ScanProfileView}/>
		    <Route exact path="/scanned-profile/:scanId" component={ScannedProfileView}/>
		    <Route exact path="/activity/:id-:name" component={Activity}/>
		    {/*<Route exact path="/partner-see-customer" component={PartnerSeeUser}/>*/}
		    <Route exact path="/:destination" component={Destination}/>
		    {/*<Route exact path="/profile" component={Profile}/>*/}
		    <Route component={Error404}/>
		    {/*<Route exact path="*" component={PageNotFound}/>*/}
	    </Switch>
    </BrowserRouter>
);

export default routes