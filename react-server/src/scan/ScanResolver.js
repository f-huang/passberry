const Scan = require('./ScanModel');
const { getStatus, StatusCodeEnum } = require("../status");

const scan = (input) => ({
	'attraction_id': input.attractionId,
	'staff_user_id': input.userId,
	'qr_code': input.qr,
	'state': input.state,
	'timestamp': input.timestamp,
});

const resolver = {
	Mutation: {
		createScan: (_, { input }) => {
			return Scan.create(scan(input)).then(insertId => {
				return ({
					status: getStatus(StatusCodeEnum.success, 'OK'),
					scan: {...input, id: insertId}
				})
			}).catch(e => {
				console.error(e);
				return {status: getStatus(StatusCodeEnum.serverSideError, e), scan: {...input, id: -1}}
			});
		},

		updateScanState: (_, { input }) => {
			return Scan.update(input).then(affectedRows => {
				return Scan.getById(input.id).then(scan => ({
					status: getStatus(StatusCodeEnum.success, 'OK'),
					scan: scan
				}))
			}).catch(e => {
				console.error(e);
				return {status: getStatus(StatusCodeEnum.serverSideError, e), scan: null}
			});
		}
	}
};

module.exports = resolver;