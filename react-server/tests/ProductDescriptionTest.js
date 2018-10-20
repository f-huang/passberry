const chai = require('chai');
const expect = chai.expect;
const ProductDescription = require('../src/activity/ActivityModel');

chai.use(require('chai-as-promised'));


describe("ProductDescription.addProductDescription()", () => {
	it("Add a product description", () => {
		const description = {
			name: "Test",
			description: "This is a test",
			price: 999.99,
			type: "VIP thing to do"
		};
		const ret = ProductDescription.addProductDescription(description)
		return expect(ret).to.eventually.be.a("number");
	});
});


describe("ProductDescription.getProducts()", () => {
	it("Add a product description", () => {
		const ret = ProductDescription.getProducts();
		return expect(ret).to.eventually.contains.keys("name", "description", "price", "type");
	});
});
