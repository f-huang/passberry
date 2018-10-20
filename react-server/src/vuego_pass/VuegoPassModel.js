const pool = require("../database/pool");
const Activity = require("../activity/ActivityModel");

const TABLE_NAME = 'vuego_pass';
const VUEGO_ACTIVITY_TABLE_NAME = 'vuego_pass_activity';
const ACTIVITY_TABLE_NAME = 'activity';
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
	Activity.getMustDos(destination).then(activities => {
		resolve({
			name: mustDoPassDetails.name,
			description: mustDoPassDetails.description,
			destination: destination,
			activities: activities.map(activity => activity),
			price: activities.reduce((sum, current) => sum + current.priceAdult, 0),
			discount: mustDoPassDetails.discount
		});
	});
});
