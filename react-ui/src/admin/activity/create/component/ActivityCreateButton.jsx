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
	return ({
		images: state.createActivityPage.images,
		name: state.createActivityPage.name,
		price: state.createActivityPage.price,
		type: state.createActivityPage.type,
		description: state.createActivityPage.description,
		link: state.createActivityPage.link,
		address: state.createActivityPage.address,
	})
};

export default connect(mapStateToProps)(ActivityCreateButton);