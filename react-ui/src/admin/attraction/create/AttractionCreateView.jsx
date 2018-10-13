import React from "react";
import TextInput from "../../../component/TextInput/TextInput";
import AddressInput from "../../../component/AddressInput/AddressInput";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import { connect } from "react-redux";
import {setInput, setImages, setPriceInput, setAddressInput} from "./attractionCreateActions";
import AttractionCreateButton from "./component/AttractionCreateButton";


class AttractionCreateView extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onChangeImages = this.onChangeImages.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeAddress = this.onChangeAddress.bind(this);
	}

	onSubmit = event => {
		event.preventDefault();
	};

	onChangeInput = (event) => {
		this.props.onChangeInput({ [event.target.name]: event.target.value });
	};

	onChangeImages = (event) => {
		this.props.onChangeImages({ images: event.target.files })
	};

	onChangePrice = (event) => {
		this.props.onChangePrice({ [event.target.name]: parseFloat(event.target.value) });
	};

	onChangeAddress = (event) => {
		this.props.onChangeAddress({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<div className="AddActivity">
				<h1>{"Nouvelle attraction"}</h1>
				<form method="POST" encType="multipart/form-data" onSubmit={this.onSubmit} autoComplete="off">
					<TextInput
						id="AddActivity-name"
						name="name"
						label={"Nom"}
						onChange={this.onChangeInput}
						placeholder={"Musée"}
						required
					/>
					<TextInput
						id="AddActivity-price"
						name="adult"
						onChange={this.onChangePrice}
						label={"Tarif adulte"}
						required
					/>
					<TextInput
						id="AddActivity-price"
						name="child"
						onChange={this.onChangePrice}
						label={"Tarif enfant"}
					/>
					<TextInput
						id="AddActivity-price"
						name="maxAgeForChild"
						onChange={this.onChangePrice}
						label={"Âge maximum de l'enfant"}
					/>
					<TextInput
						id="AddActivity-price"
						name="student"
						onChange={this.onChangePrice}
						label={"Tarif étudiant"}
					/>
					<TextInput
						id="AddActivity-type"
						name="type"
						label={"Type d'activité"}
						onChange={this.onChangeInput}
						placeholder="RESTAURANT ou ATTRACTION"
						required
					/>
					<div>
					<div><label htmlFor="AddActivity-description">Description</label></div>
					<textarea
						id="AddActivity-description"
						onChange={this.onChangeInput}
						name="description"
						placeholder="Enter description here."
					/>

					</div>
					<TextInput
						id="AddActivity-link"
						name="link"
						onChange={this.onChangeInput}
						label={"Lien: http://www"}
						type="url"
					/>
					<AddressInput onChange={this.onChangeAddress} required/>
					<div>
						<label htmlFor="AddActivity-images">Images</label>
						<input id="AddActivity-images"
						       name="images"
						       onChange={this.onChangeImages}
						       type="file"
						       accept=".jpg, .jpeg, .png, .gif" multiple/>
					</div>
					<AttractionCreateButton/>
				</form>
			</div>
		);
	}
}
//
// const mapStateToProps = (state) => {
// 	return ({
// 		images: state.createAttraction.images,
// 		name: state.createAttraction.name,
// 		priceAdult: state.createAttraction.priceAdult,
// 		priceChild: state.createAttraction.priceChild,
// 		priceStudent: state.createAttraction.priceStudent,
// 		priceMaxAgeForChild: state.createAttraction.priceMaxAgeForChild,
// 		type: state.createAttraction.type,
// 		description: state.createAttraction.description,
// 		link: state.createAttraction.link,
// 		addressStreet: state.createAttraction.addressStreet,
// 		addressSupplement: state.createAttraction.addressSupplement,
// 		addressCity: state.createAttraction.addressCity,
// 		addressPostcode: state.createAttraction.addressPostcode,
// 		addressCountryCode: state.createAttraction.addressCountryCode,
// 	})
// };

const mapDispatchToProps = (dispatch) => {
	return ({
		onChangeInput: (input) => { dispatch(setInput(input)) },
		onChangePrice: (input) => { dispatch(setPriceInput(input)) },
		onChangeAddress: (input) => { dispatch(setAddressInput(input)) },
		onChangeImages: (images) => { dispatch(setImages(images)) }
	})
};



export default connect(null, mapDispatchToProps)(AttractionCreateView);