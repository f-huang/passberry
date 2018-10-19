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

export const GET_ATTRACTIONS_BY_TYPE = gql`
	query getAttractionsByType($type: ProductType!) {
		getAttractionsByType(type: $type) {
			id
			name
			link
			description
			type
			noQueuing
			images
			price {
				adult
				child
				maxAgeForChild
			}
			address {
				street
				supplement
				city
				postcode
				country
			}
			openingTimes {
				timeSlot
				secondTimeSlot
			}
		}
	}
`;


export const GET_ATTRACTION_BY_ID = gql`
	query getAttractionById($id: ID!) {
		getAttractionById(id: $id) {
			id
			name
			link
			description
			type
			noQueuing
			images
			price {
				adult
				child
				maxAgeForChild
			}
			address {
				street
				supplement
				city
				postcode
				country
			}
			openingTimes {
				timeSlot
				secondTimeSlot
			}
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
			tickets {
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
			firstName
			lastName
		}
	}
`;

export const GET_TRAVELER_BY_QR = gql`
	query getTravelerByQr($qrValue: String!){
		getTravelerByQr(qr: $qrValue) {
			id
			firstName
			lastName
		}
	}
`;

export const GET_TICKET_BY_QR_AND_ATTRACTION_ID = gql`
	query getTicketByQrAndAttractionId($qrValue: String!, $attractionId: ID!) {
		getTicketByQrAndAttractionId(qr: $qrValue, attractionId: $attractionId) {
			id
			passId
			usedTime
			attractionId
		}
	}
`;


export const GET_TICKET_BY_TRAVELER_ID_AND_ATTRACTION_ID = gql`
	query getTicketByTravelerIdAndAttractionId($travelerId: ID!, $attractionId: ID!) {
		getTicketByTravelerIdAndAttractionId(travelerId: $travelerId, attractionId: $attractionId) {
			id
			passId
			usedTime
			attractionId
		}
	}
`;


export const CREATE_SCAN = gql`
	mutation createScan($input: CreateScanInput!) {
		createScan(input: $input) {
			status {
				code
				message
			}
			scan {
				id
				qr
				attractionId
				state
			}
		}
	}
`;

export const UPDATE_SCAN_STATE =  gql`
	mutation updateScanState($input:UpdateScanStateInput!) {
		updateScanState(input: $input) {
			status {
				code
				message
			}
			scan {
				id
				qr
				attractionId
				state
			}
		}
	}
`;

export const CREATE_ENTRY = gql`
	mutation createEntry($input: CreateEntryInput!) {
		createEntry(input: $input) {
			status {
				code
				message
			}
			entry {
				id
				timestamp
				state
				attractionId
				userId
				scanId
				comment
			}
		}
	}
`;

export const CREATE_ATTRACTION = gql`
	mutation createAttraction($input: CreateAttractionInput!) {
		createAttraction(input: $input) {
			status {
				code
				message
			}
		}
	}
`;