import gql from "graphql-tag"

export const SIGN_IN = `
	mutation signIn($input: SignInInput!) {
		signIn(input: $input) {
			status {
				message
				code
			}
			errorMessage
			token
		}
	}
`;

export const GET_QR_BY_TOKEN = gql`
	query getQrByToken($token: String!) {
		getQrByToken(token: $token)
	}
`;

export const GET_QR_BY_USER_ID = gql`
	query getQrByUserId($userId: ID!) {
		getQrByUserId(userId: $userId)
	}
`;

export const GET_ATTRACTION_BY_TYPE = gql`
	query getAttractionByType($type: ProductType!) {
	  getAttractionByType(type: $type) {
	    id
	    name
	    link
	    description
	    price {
	      adult
	      child
	      maxAgeForChild
	    }
	    type
	  }
	}
`;


export const GET_ATTRACTION_BY_ID = gql`
	query getAttractionById($id: ID!) {
		getAttractionById(id: $id) {
			id
			name
			description
			link
			price {
				adult
				child
				maxAgeForChild
			}
			type
		}
	}
`;

export const GET_ADDRESS_BY_ID = gql`
	query getAddressById($id: ID!) {
	    getAddressById(id:$id) {
			id
			street
			supplement
			city
			postcode
			countryCode
		}
	}
`;


export const CREATE_BASKET = gql`
	mutation createBasket($input: CreateBasketInput!) {
		createBasket(input: $input) {
			status{
				code
				message
			}
			basket{
				id
				userId
				items {
					userId
					quantity
					itemId
				}
			}
		}
	}
`;

export const UPDATE_BASKET  = gql`
	mutation updateBasket($input: UpdateBasketInput!) {
		updateBasket(input: $input) {
			status {
				code
				message
			}
			basket {
				id
				userId
		        items {
					userId
					quantity
					itemId
				}
			}
	  }
	}
`;

export const VALIDATE_BASKET = gql`
	mutation validateBasket($input: ValidateBasketInput!) {
		validateBasket(input: $input) {
			status {
				code
				message
			}
			userId
			basketId
		}
	}
`;

export const CREATE_PASS = gql`
	mutation createPass($input: CreatePassInput!) {
		createPass(input: $input) {
			status {
			code
			message
		}
		pass {
			id
			userId
			travelerId
			attractions {
				attractionId
				usedTime
				}
			}
		}
	}
`;

export const GET_PASSES_BY_USER_ID = gql`
	query getPassesByUserId($userId: ID!) {
		getPassesByUserId(userId: $userId) {
			passes {
				id
				userId
				travelerId
				tickets {
					id
					attractionId
					usedTime
				}
			}
		}
	}
`;

export const GET_TRAVELERS_BY_USER_ID = gql`
	query getTravelersByUserId($userId: ID!){
		getTravelersByUserId(userId: $userId) {
			id
			userId
			firstName
			lastName
		}
	}
`;