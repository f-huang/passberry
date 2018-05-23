import React from "react";
import "./AddProductDescription.css";
import TextInput from "../../component/TextInput/TextInput";


class AddProductDescription extends React.Component {
	render() {
		return (
			<div className="AddActivity">
				<form method="POST">
					<TextInput
						id="AddActivity-name"
						name="AddActivity-name"
						label="Name"
						placeholder="Museum"
					/>
					<TextInput
						id="AddActivity-price"
						name="AddActivity-price"
						label="Price"
						placeholder="12.90€"
					/>
					<TextInput
						id="AddActivity-type"
						name="AddActivity-type"
						label="Type of activity"
						placeholder="Museum, restaurant, church, ..."
					/>
					<div>
					<label htmlFor="AddActivity-description">Description</label>
					<textarea
						id="AddActivity-description"
						name="AddActivity-description"
						placeholder="Enter description here."
					/>
					</div>
					<TextInput
						id="AddActivity-link"
						name="AddActivity-link"
						label="Link"
						type="url"
					/>
					<input type="submit"/>
				</form>
			</div>
		);
	}
}

export default AddProductDescription;