import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

//COMPONENTS
import SignUp from "./customer/Credentials/SignUp/SignUp";
import Login from "./customer/Credentials/Login";
import QRPage from "./customer/QRPage";
import ProfilePage from "./customer/ProfilePage";
import ParametersPage from "./customer/ParametersPage";
import TripsPage from "./customer/TripsPage";
import SelectionsPage from "./customer/SelectionsPage";
import Error404 from "./Error404";
import Attraction from "./customer/Attraction";
import AttractionCreate from "./admin/attraction/create/AttractionCreate";
import AttractionManage from "./admin/attraction/manage/AttractionManage";
import TravelView from "./customer/Travel/TravelView";
import TravelersView from "./customer/Travelers/TravelersView";
import DestinationOffers from "./customer/DestinationOffers/DestinationOffers";

const routes = (
    <BrowserRouter forceRefresh={true}>
	    <Switch>
		    {/*<Route exact path="/" component={CityCatalogPage}/>*/}
		    <Route exact path="/" component={TravelView}/>
		    <Route exact path="/whoscoming" component={TravelersView}/>
		    <Route exact path="/admin-add-activity" component={AttractionCreate}/>
		    <Route exact path="/admin-manage-activity" component={AttractionManage}/>
		    <Route exact path="/selections" component={SelectionsPage}/>
		    <Route exact path="/profile" component={ProfilePage}/>
		    <Route exact path="/parameters" component={ParametersPage}/>
		    <Route exact path="/trips" component={TripsPage}/>
		    <Route exact path="/qr" component={QRPage}/>
		    <Route exact path="/login" component={Login}/>
		    <Route exact path="/sign-up" component={SignUp}/>
		    {/*<Route exact path="/qr-scan" component={PartnerScanPass}/>*/}
		    {/*<Route exact path="/partner-see-customer" component={PartnerSeeUser}/>*/}
		    <Route exact path="/:destination" component={DestinationOffers}/>
		    {/*<Route exact path="/:city/pass/:typeOfJourney(vuego-made|customize)" component={Pass}/>*/}
		    <Route exact path="/attraction/:id-:name" component={Attraction}/>
		    {/*<Route exact path="/shopping-cart" component={ShoppingCart}/>*/}
		    {/*<Route exact path="/pass" component={Pass}/>*/}
		    {/*<Route exact path="/profile" component={Profile}/>*/}
		    <Route component={Error404}/>
		    {/*<Route exact path="*" component={PageNotFound}/>*/}
	    </Switch>
    </BrowserRouter>
);

export default routes