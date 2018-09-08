import React from "react";
import "./AttractionCreate.css";
import TextInput from "../../../component/TextInput/TextInput";
import AddressInput from "../../../component/AddressInput/AddressInput";
import ButtonSubmit from "../../../component/Button/ButtonSubmit/ButtonSubmit";
import apiCall from "../../../api";

const api = '/graphql';

const query = `
	mutation attractionCreate($attraction: AttractionCreate) {
		attractionCreate(attraction: $attraction) {
			id
			code
			message
		}
	}
`;


class AttractionCreate extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			name: "",
			price: "",
			type: "",
			description: "",
			link: ""
		}
	}

	onSubmit = event => {
		const attraction = {
			"name": this.state.name,
			"price": parseFloat(this.state.price),
			"type": this.state.type,
			"description": this.state.description,
			"link": this.state.link
		};
		console.log(attraction);
		event.preventDefault();
		apiCall(query, { "attraction": attraction })
			.then(out => {
				const json = JSON.parse(out).data.attractionCreate;
				// if (json.ids.length > 0) {
					//save images
				// }
			})
	};

	onChangeInput = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	render() {
		return (
			<div className="AddActivity">
				<form method="POST" onSubmit={this.onSubmit} autoComplete="off">
					<TextInput
						id="AddActivity-name"
						name="name"
						label="Name"
						onChange={this.onChangeInput}
						placeholder="Museum"
						required
					/>
					<TextInput
						id="AddActivity-price"
						name="price"
						onChange={this.onChangeInput}
						label="Price"
						placeholder="12.90€"
					/>
					<TextInput
						id="AddActivity-type"
						name="type"
						label="Type of activity"
						onChange={this.onChangeInput}
						placeholder="Museum, restaurant, church, ..."
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
						label="Link"
						type="url"
					/>
					<AddressInput/>
					<div>
						<label htmlFor="AddActivity-images">Images</label>
						<input id="AddActivity-images" name="images" type="file" accept=".jpg, .jpeg, .png, .gif" multiple/>
					</div>
					<ButtonSubmit value={"Ajouter"}/>
				</form>
			</div>
		);
	}
}

export default AttractionCreate;