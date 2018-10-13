const { convertPathToImage } = require("../imageUtils");

const formatAttraction = (attraction) => {
	attraction.price = {
		adult: parseFloat(attraction.priceAdult),
		child: attraction.priceChild ? parseFloat(attraction.priceChild) : null,
		student: attraction.priceStudent ? parseFloat(attraction.priceStudent) : null,
		maxAgeForChild: attraction.maxAgeForChild ? parseInt(attraction.maxAgeForChild, 10) : null
	};
	attraction.address = {
		street: attraction.addressStreet,
		supplement: attraction.addressSupplement,
		city: attraction.addressCity,
		postcode: attraction.addressPostcode,
		countryCode: attraction.addressCountryCode,
	};
	attraction.id = parseInt(attraction.id, 10);
	if (attraction.images) {
		attraction.images = attraction.images.split(',').map(path => convertPathToImage(path));
	}
	delete attraction['priceChild'];
	delete attraction['priceAdult'];
	delete attraction['maxAgeForChild'];
	delete attraction['addressStreet'];
	delete attraction['addressSupplement'];
	delete attraction['addressCity'];
	delete attraction['addressPostcode'];
	delete attraction['addressCountryCode'];
	return attraction;
};

module.exports = {
	formatAttraction: formatAttraction
};