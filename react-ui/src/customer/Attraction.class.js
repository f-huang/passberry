export default class Attraction {
	getVuegoMadeAttractions = (numberOfDays) => {
		// const query = `
		// 	getVuegoMadeAttractions($numberOfDays: Int) {
		// 		vuegoMadeAttractions(numberOfDays: $numberOfDays) {
		// 			attraction
		// 		}
		// 	}
		// `;
		numberOfDays = parseInt(numberOfDays, 10);
		if (numberOfDays <= 0 || numberOfDays > 2)
			return undefined;
		else if (numberOfDays === 1) {
			return [{
				when: '10h - 12h',
				name: 'Musée Océanographique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '12h - 13h30',
				name: 'Repas au musée océonagraphique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '14h - 15h',
				name: 'Jardin exotique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '16h -18h',
				name: 'Collections de voitures du prince',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}];
		}
		else {
			return [{
				when: '10h - 12h',
				name: 'Musée Océanographique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '12h - 13h30',
				name: 'Repas au musée océonagraphique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '14h - 15h',
				name: 'Jardin exotique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '16h -18h',
				name: 'Collections de voitures du prince',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '10h - 12h',
				name: 'Musée Océanographique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '12h - 13h30',
				name: 'Repas à la Condamine',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '14h - 15h',
				name: 'Jardin exotique',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}, {
				when: '16h -18h',
				name: 'Collections de voitures du prince',
				price: {
					adult: 12,
					child: 12
				},
				NoQueue: true
			}];
		}
	};
};