import React from 'react';
import {withRouter} from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Button from "../../component/Button/Button";
import theme from "../../app/theme";

import "./Login.css";
import HrText from "../../component/HrText";

const onClickSignIn = (props) => {
	props.history.push("sign-up");
};

const onClickLater = (props) => {
	props.history.push("/");
};


const buttonStyle = {
	backgroundColor: theme.colorPrimary,
	margin: "0 auto"
};

const Login = (props) =>
	<div className={"Login"}>
		<h1 className={"Login-name"}>{"Vuego"}</h1>
		<SignIn/>
		<HrText value={"ou"}/>
		{/*<div className={"Login-or-break"}><span>ou</span></div>*/}
		<div className="Login-button-container">
			<Button secondClassName={"Login-Buttons"}
			        style={buttonStyle}
			        onClick={ () => onClickSignIn(props) }
			        value={"Créer un compte"}/>
		</div>
		<div className="Login-button-container">
			<Button secondClassName={"Login-Buttons"}
			        style={buttonStyle}
			        onClick={ () => onClickLater(props) }
			        value={"S'inscrire plus tard"}/>
		</div>
	</div>;

export default withRouter(Login);
