import React from "react";
import { connect } from "react-redux";

import TextInput from "../../../component/TextInput/TextInput";
import Button from "../../../component/Button/Button";

const Traveler = ({traveler, removable, onClick, onChange}) => (
	<div>
		<TextInput name={"travelers"} placeholder={"Prénom"} value={traveler ? traveler.name || "" : ""} onChange={onChange}/>
		{removable &&
		<Button value={"x"} onClick={onClick}/>
		}
	</div>
);

const mapStateToProps = (state, {id}) => {
	return {
		traveler: state.travelers.travelers[id]
	};
};

export default connect(mapStateToProps)(Traveler)