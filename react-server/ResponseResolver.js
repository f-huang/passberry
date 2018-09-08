const resolver = {
	ResponseMutation: (response) => ({
		error: response.error,
		message: response.message
	})
};

module.exports = resolver;