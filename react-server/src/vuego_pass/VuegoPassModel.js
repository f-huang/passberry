const pool = require("../database/pool");
const Attraction = require("../attraction/AttractionModel");
const { formatAttraction } = require("../attraction/attractionUtils");

const TABLE_NAME = 'vuego_pass';
const VUEGO_ATTRACTION_TABLE_NAME = 'vuego_pass_attraction';
const ATTRACTION_TABLE_NAME = 'attraction';
const IMAGE_TABLE_NAME = "attraction_image";


const mustDoPassDetails = {
	name: "Pass Must Do",
	description: "Tous les must do de la ville",
	discount: {
		type: 'PERCENT',
		amount: '10'
	}
};

exports.getPassMustDo = (destination) => new Promise((resolve, reject) => {
	Attraction.getMustDos(destination).then(attractions => {
		resolve({
			name: mustDoPassDetails.name,
			description: mustDoPassDetails.description,
			destination: destination,
			attractions: attractions.map(attraction => formatAttraction(attraction)),
			price: attractions.reduce((sum, current) => sum + current.price.adult, 0),
			discount: mustDoPassDetails.discount
		});
	});
});
