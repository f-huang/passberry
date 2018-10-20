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

export const GET_ALL_ACTIVITIES = gql`
	query getAllActivities($limit: Int) {
		getAllActivities(limit: $limit) {
			id
			name
			link
			noQueuing
			description
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
			type
		}
	}
`;


export const GET_ACTIVITIES_BY_TYPE = gql`
	query getActivitiesByType($type: ActivityType!) {
		getActivitiesByType(type: $type) {
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


export const GET_ACTIVITY_BY_ID = gql`
	query getActivityById($id: ID!) {
		getActivityById(id: $id) {
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
				activityId
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
					activityId
					usedTime
				}
			}
		}
	}
`;

export const GET_USER_BY_SCAN_ID = gql`
	query getUserByScanId($scanId: ID!) {
		getUserByScanId(scanId: $scanId) {
			id
			type
			gender
			birthdate
			email
			firstName
			lastName
			address{
				street
				supplement
				postcode
				city
				country
			}
			studentStatus {
				isValidated
				expirationDate
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

export const GET_USER_TRAVELS = gql`
	query getUserTravels($userId: ID!) {
		getUserTravels(userId: $userId) {
			destination
			startDate
			endDate
			numberOfTravelers
		}
	}
`;

export const GET_TICKET_BY_QR_AND_ACTIVITY_ID = gql`
	query getTicketByQrAndActivityId($qrValue: String!, $activityId: ID!) {
		getTicketByQrAndActivityId(qr: $qrValue, activityId: $activityId) {
			id
			passId
			usedTime
			activityId
		}
	}
`;

export const GET_TICKET_BY_TRAVELER_ID_AND_ACTIVITY_ID = gql`
	query getTicketByTravelerIdAndActivityId($travelerId: ID!, $activityId: ID!) {
		getTicketByTravelerIdAndActivityId(travelerId: $travelerId, activityId: $activityId) {
			id
			passId
			usedTime
			activityId
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
				activityId
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
				activityId
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
				activityId
				userId
				scanId
				comment
			}
		}
	}
`;

export const CREATE_ACTIVITY = gql`
	mutation createActivity($input: CreateActivityInput!) {
		createActivity(input: $input) {
			status {
				code
				message
			}
		}
	}
`;