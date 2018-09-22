

module.exports = {
	getStatus: (code, message) => ({
		code: code, message: message
	}),

	StatusCodeEnum: {
		success: 'SUCCESS',
		serverSideError: 'SERVER_SIDE_ERROR',
		clientSideError: 'CLIENT_SIDE_ERROR'
	}
};