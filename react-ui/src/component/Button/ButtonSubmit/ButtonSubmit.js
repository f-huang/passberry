import React, { Component } from "react";
import Button from "../Button";
import theme from "../../../app/theme";


class ButtonSubmit extends Component {

	state = { isFormValid: undefined };

	componentWillReceiveProps(nextProps) {
		this.setState({ isFormValid: nextProps.isFormValid })
	}

	render() {
		const {value, isFormValid, ...rest} = this.props;
		const isClickable = (
			(isFormValid !== null && isFormValid !== undefined)
			|| (this.state.isFormValid !== null && this.state.isFormValid !== undefined)
		) ? isFormValid || this.state.isFormValid : true;

		return (
			<Button type="submit"
			        value={ value }
			        secondClassName={ "ButtonSubmit" }
			        backgroundColor={theme.colorPrimary}
			        isClickable={ isClickable }
			        { ... rest }
			/>
		);
	}
}

export default ButtonSubmit;