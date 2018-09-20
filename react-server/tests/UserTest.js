const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user/UserModel');

chai.use(require('chai-as-promised'));


describe('User.addUser()', function () {
	// it('add fhuang in db', function (done) {
	// 	const user = {
	// 		email: "fhuang@student.42.fr",
	// 		firstName: "Fanny",
	// 		lastName: "Huang",
	// 		password: "1234567890",
	// 		gender: "F",
	// 		type: User.getUserTypes().Staff
	// 	};
	// 	const promiseAdd = User.addUser(user);
	// 	promiseAdd.then((insertId) => {
	// 		const promiseGet = User.getUserById(insertId);
	// 		expect(promiseGet).to.eventually.deep.equal({mail: user.email});
	// 	}).then(done, done);
	// });
});


describe('User.updateUser()', function() {
	it('update user gender', () => {
		const newUser = {
			id: 1,
			gender: "O"
		};

		const ret = User.updateUser(newUser);
		return expect(ret).to.eventually.be.an('object');
	});
});


describe('User.exists()', function () {
	it('check if fhuang in db', function () {
		const email = "fhuang@student.42.fr";
		const ret = User.exists(email);
		return expect(ret).to.eventually.equal(true);
	});

	it('check if toto in db', function () {
		const email = "toto@student.42.fr";
		const ret = User.exists(email);
		return expect(ret).to.eventually.equal(false);
	});
});


describe('User.getUserTypes()', function () {
	it('check if an object is returned', function () {
		const expected = Object.freeze({
			Tourist: "TOURIST",
			Partner: "PARTNER",
			Staff: "STAFF",
			Municipality: "MUNICIPALITY"
		});
		const ret = User.getUserTypes();
		return expect(ret).to.be.an('object');
	});

	it('check if an object is returned', function () {
		const ret = User.getUserTypes();
		return expect(ret).to.have.all.keys('Tourist', 'Partner', 'Staff', 'Municipality');;
	});
});


describe('User.getUser()', function () {
	it('check if a user is returned with default columns', function () {
		const expected = {
			_id: 1,
			password: '1234567890'
		};
		const ret = User.getUser('fhuang@student.42.fr', '1234567890');
		return expect(ret).to.eventually.deep.equal(expected);
	});

	it('check if a user is returned with custom columns', function () {
		const expected = {
			_id: 1,
			password: '1234567890',
			birthday: null
		};
		const ret = User.getUser('fhuang@student.42.fr', '1234567890', ['birthday']);
		return expect(ret).to.eventually.deep.equal(expected);
	});

	it('check if user\'s mail corresponds to password', function () {
		const ret = User.getUser('fhuang@student.42.fr', 'testtest');
		return expect(ret).to.eventually.deep.equal(undefined);
	});

	it('check if password empty', function () {
		const ret = User.getUser('fhuang@student.42.fr', '');
		return expect(ret).to.eventually.deep.equal(undefined);
	});

	it('check if wrong user', function () {
		const ret = User.getUser('toto@student.42.fr', '1234567890');
		return expect(ret).to.eventually.deep.equal(undefined);
	});
});


describe('User.getUserById()', function () {
	it('check if a user is returned', function () {
		const email = "fhuang@student.42.fr";
		const ret = User.getUserById(1);
		return expect(ret).to.eventually.deep.equal({ mail: email });
	});

	it('check if a user is returned with custom columns', function () {
		const expected = {
			mail: "fhuang@student.42.fr",
			first_name: "Fanny",
			last_name: "Huang"
		};
		const ret = User.getUserById(1, ['first_name', 'last_name']);
		return expect(ret).to.eventually.deep.equal(expected);
	});

	it('check if a user was found', function () {
		const ret = User.getUserById(0);
		return expect(ret).to.eventually.deep.equal(undefined);
	});
});


