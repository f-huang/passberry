import React from "react";
import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { CREATE_ATTRACTION } from "../../../../queries";
import ButtonSubmit from "../../../../component/Button/ButtonSubmit/ButtonSubmit";

const onClick = (props, mutate) => {
	console.log(props);
	mutate({
		variables: {
			input: {
				...props
			}
		}
	})
};


const AttractionCreateButton = (props) => {
	// console.log("new props", props.images);
	return (
		<Mutation mutation={ CREATE_ATTRACTION }
		          update={(cache, { data: { createAttraction }}) => {
		          	console.log(createAttraction);
		          }}
		>
			{ (mutate) =>
				<ButtonSubmit value={"Créer"} onClick={e => onClick(props, mutate)}/>
			}
		</Mutation>
	)
};

const mapStateToProps = (state) => {
	console.log("state: ", state.createAttraction.images);
	return ({
		images: state.createAttraction.images,
		name: state.createAttraction.name,
		price: state.createAttraction.price,
		type: state.createAttraction.type,
		description: state.createAttraction.description,
		link: state.createAttraction.link,
		address: state.createAttraction.address,
	})
};

export default connect(mapStateToProps)(AttractionCreateButton);