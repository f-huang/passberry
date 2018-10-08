import React from "react";
import PropTypes from "prop-types";
import TouristDataForm from "../component/TouristDataForm";

const updateData = (array, index, newValue) => {
	array[index] = {...array[index], ...newValue};
	return array;
};

class PassUserForm extends React.Component {

	static propTypes = {
		touristData: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			birthdate: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
		})),
		updateTouristData: PropTypes.func,
		onRemove: PropTypes.func.isRequired
	};

	state = {
		touristData: this.props.touristData
	};

	componentWillReceiveProps(props) {
		if (props.touristData)
			this.setState({touristData: props.touristData});
	}

	onChangeName = (e, index) => {
		const name = e.target.value;
		const touristData = updateData(this.state.touristData, index, {name: name});
		e.preventDefault();
		this.props.updateTouristData(touristData);
	};

	onChangeBirthdate = (e, index) => {
		let birthdate = e.target.value;
		const touristData = updateData(this.state.touristData, index, {birthdate: birthdate});
		e.preventDefault();
		this.props.updateTouristData(touristData);
	};

	onChangeStatus = (e, index) => {
		const status = e.target.value;
		const touristData = updateData(this.state.touristData, index, {status: status});
		e.preventDefault();
		this.props.updateTouristData(touristData);
	};

	getAttrs = () => {
		const attrs = [];
		for (let i = 0; i < this.state.touristData.length; i++) {
			const attr = {
				key: `tourist-${i}`,
				index: i,
				onChangeName: ((e) => this.onChangeName(e, i)),
				onChangeBirthdate: ((e) => this.onChangeBirthdate(e, i)),
				onChangeStatus: ((e) => this.onChangeStatus(e, i)),
				onRemove: ((e) => this.props.onRemove(e, i)),
				value: this.state.touristData[i]
			};
			if (i === 0)
				delete attr.onRemove;
			attrs.push(attr);
		}
		return attrs;
	};

	render() {
		const attrs = this.getAttrs();
		return (
			attrs.map(attr =>
				<TouristDataForm {...attr}/>
			)
		)
	}
}

export default PassUserForm;