const chai = require('chai');
const expect = chai.expect;
const Country = require('../src/country/CountryModel');

chai.use(require('chai-as-promised'));


describe("Country.getCountryByName()", () => {
	it("Check if country is returned", () => {
		const fr = {
			code: "FR",
			name: "France"
		};
		const ret = Country.getCountryByName(fr.name);
		return expect(ret).to.eventually.equal(fr.code);
	});

	it("Check if case insensitive", () => {
		const fr = {
			code: "FR",
			name: "FrAnCE"
		};
		const ret = Country.getCountryByName(fr.name);
		return expect(ret).to.eventually.equal(fr.code);
	});

	it("Check if name is blank", () => {
		const ret = Country.getCountryByName("");
		return expect(ret).to.eventually.be.rejectedWith("Invalid name");
	});

	it("Check if nothing was found", () => {
		const name = "Somewhere";
		const ret = Country.getCountryByName(name);
		return expect(ret).to.eventually.be.rejectedWith("Not found");
	});
});


describe("Country.getCountryByCode()", () => {
	it("Check if country is returned", () => {
		const fr = {
			code: "FR",
			name: "France"
		};
		const ret = Country.getCountryByCode(fr.code);
		return expect(ret).to.eventually.equal(fr.name);
	});

	it("Check if case insensitive", () => {
		const fr = {
			code: "fr",
			name: "France"
		};
		const ret = Country.getCountryByCode(fr.code);
		return expect(ret).to.eventually.equal(fr.name);
	});

	it("Check if code is blank", () => {
		const ret = Country.getCountryByCode("");
		return expect(ret).to.eventually.be.rejectedWith("Invalid code");
	});

	it("Check if nothing was found", () => {
		const code = "SW";
		const ret = Country.getCountryByName(code);
		return expect(ret).to.eventually.be.rejectedWith("Not found");
	});
});