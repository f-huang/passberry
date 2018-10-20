import React from "react";
import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { CREATE_ACTIVITY } from "../../../../queries";
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


const ActivityCreateButton = (props) => {
	return (
		<Mutation mutation={ CREATE_ACTIVITY }
		          update={(cache, { data: { createActivity }}) => {
		          	console.log(createActivity);
		          }}
		>
			{ (mutate) =>
				<ButtonSubmit onClick={e => onClick(props, mutate)}>
					{ "Créer" }
				</ButtonSubmit>
			}
		</Mutation>
	)
};

const mapStateToProps = (state) => {
	console.log("state: ", state.createActivity.images);
	return ({
		images: state.createActivity.images,
		name: state.createActivity.name,
		price: state.createActivity.price,
		type: state.createActivity.type,
		description: state.createActivity.description,
		link: state.createActivity.link,
		address: state.createActivity.address,
	})
};

export default connect(mapStateToProps)(ActivityCreateButton);