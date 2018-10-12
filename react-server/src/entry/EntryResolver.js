const Entry = require('./EntryModel');
const { getStatus, StatusCodeEnum } = require("../status");

const entry = (input) => ({
	'id': input.id,
	'timestamp': input.timestamp,
	'staff_user_id': input.userId,
	'attraction_id': input.attractionId,
	'scan_id': input.scanId,
	'state': input.state,
	...(input.comment ? { 'comment': input.comment } : {})
});

const resolver = {
	Mutation: {
		createEntry: (_, { input }) => {
			return Entry.create(entry(input)).then(insertId => ({
					status: getStatus(StatusCodeEnum.success, 'OK'),
					entry: {...input, id: insertId}
				})
			).catch(e => {
				console.error(e);
				return { status: getStatus(StatusCodeEnum.serverSideError, e), entry: {...input, id: -1} }
			});
		}
	}
};

module.exports = resolver;