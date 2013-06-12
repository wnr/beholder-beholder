//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Require the 'utils' module to be tested.
var utils = require('../lib/utils');

//Require the 'expect' module to be used in tests.
var expect = require('expect.js');

//-----------------------------------------------
// Tests
//-----------------------------------------------

describe('utils', function() {
	describe('validate()', function() {	
		it('should be a function', function() {
			//The function should be set.
			expect(utils.validate).to.be.a('function');
		});

		it('should throw on undefined actual and default value', function() {
			//A call without actual or default value should throw an error.
			expect(function() { utils.validate(); }).to.throwError();

			//The same should happen when only a 'validator' is given.
			expect(function() { utils.validate(undefined, undefined, function(){}); }).to.throwError();
		});

		it('should return the actual value', function() {
			//When only 'actual' value is set, the value should be returned.
			expect(utils.validate('actual value')).to.equal('actual value');
		});

		it('should return the default value when actual is unset', function() {
			//When 'actual' is unset, default should be returned.
			expect(utils.validate(undefined, 'default value')).to.equal('default value');

			//The same should happen if a 'validator' is given.
			expect(utils.validate(undefined, 'default value', function() {})).to.equal('default value');
		});

		it('should return actual value if both actual and default is present', function() {
			//When both 'actual' and default is set, 'actual' should be returned.
			expect(utils.validate('actual value', 'default value')).to.equal('actual value');
		});

		it('should validate actual value with given function', function () {
			//Function to do simple validating.
			function validator(actual) {
				//Check if the 'actual' value equals 'actual value'.
				if(actual === 'a value') {
					//It does.

					//return 'true' to indicate valid value.
					return true;
				}
			}

			//When 'actual' and 'validator' is set, the validate function should listen to the given 'validator' function.
			expect(utils.validate('a value', undefined, validator)).to.equal('a value');

			//The same should happen when 'default' value is set.
			expect(utils.validate('a value', 'default value', validator)).to.equal('a value');

			//The function should throw an error if the value is invalid.
			expect(function() { utils.validate('other value', undefined, validator); }).to.throwError();

			//The same should happen when 'default' value is set.
			expect(function() { utils.validate('other value', 'default value', validator); }).to.throwError();
		});

		it('should use the default validator when string is present as third argument', function() {
			//Should return 'actual' if 'actual' is set to a number and 'validator' set to the string 'number'.
			expect(utils.validate(1337, undefined, 'number')).to.equal(1337);

			//Should throw an error if 'actual' is set to a number and 'validator' set a string != 'number'.
			expect(function() { utils.validate(1337, undefined, 'a string'); }).to.throwError();
		});
	});

	describe('validators', function() {
		it('should be an object', function() {
			//The 'validators' object should be an object.
			expect(utils.validators).to.be.an('object');
		});

		describe('type', function() {
			it('should be a function', function() {
				//The type should be a function.
				expect(utils.validators.type).to.be.a('function');
			});

			it('should return a function', function() {
				//The function should return a validator function.
				expect(utils.validators.type('something')).to.be.a('function');
			});

			it('should validate right', function() {
				//Create a function that validates values of type 'number'.
				var numberValidator = utils.validators.type('number');

				//The validator function should return 'true' when given an actual number of type 'number'.
				expect(numberValidator(404)).to.equal(true);

				//The validator function should return 'false' when given an actual number of other type than 'number'.
				expect(numberValidator(true)).to.equal(false);
			});

			it('should throw error on invalid type parameter', function() {
				//The function returned should throw an error with parameter 'type' != string.
				expect(function() { utils.validators.type(1337); }).to.throwError();
			});
		});

		describe('typeOrFalse', function() {
			it('should be a function', function() {
				//The typeOrFalse should be a function.
				expect(utils.validators.typeOrFalse).to.be.a('function');
			});

			it('should return a function', function() {
				//The function should return a validator function.
				expect(utils.validators.typeOrFalse('something')).to.be.a('function');
			});

			it('should validate right', function() {
				//Create a function that validates values of type 'number'.
				var numberValidator = utils.validators.typeOrFalse('number');

				//The validator function should return 'true' when given an actual number of type 'number'.
				expect(numberValidator(404)).to.equal(true);

				//The validator function should return 'false' when given an actual number of other type than 'number'.
				expect(numberValidator(true)).to.equal(false);

				//Since the value can be 'false' the validator should return 'true' when it is.
				expect(numberValidator(false)).to.equal(true);
			});

			it('should throw error on invalid typeOrFalse parameter', function() {
				//The function returned should throw an error with parameter 'type' != string.
				expect(function() { utils.validators.typeOrFalse(1337); }).to.throwError();
			});
		});

		describe('falseOrObject', function() {
			it('should be a function', function() {
				//The falseOrObject should be a function.
				expect(utils.validators.falseOrObject).to.be.a('function');
			});

			it('should return a function', function() {
				//The function should return a validator function.
				expect(utils.validators.falseOrObject('something')).to.be.a('function');
			});

			it('should validate right', function() {
				//Create an object with three properties to validate.
				var object = {
					foo: 'function',
					bar: 'string',
					bird: 'object'
				};

				//Create a function that validates values objects that can be false with the defined properties.
				var objectValidator = utils.validators.falseOrObject(object);

				//The validator function should return 'true' when given an actual value 'false'.
				expect(objectValidator(false)).to.equal(true);

				//The validator function should return 'false' when given something else than 'false' or 'object'.
				expect(objectValidator(true)).to.equal(false);

				//The validator function should return 'false' when given a object with the wrong properties.
				expect(objectValidator({ another: 'object' })).to.equal(false);

				//The validator function should return 'false' if the properties are defined but with wrong types.
				expect(objectValidator({ foo: 1337, bar: function() {}, bird: 'lol' })).to.equal(false);

				//The validator function should return 'true' when the properties are defined and have right types.
				expect(objectValidator({ foo: function() {}, bar: 'hello', bird: {} })).to.equal(true);
			});

			it('should throw error on invalid falseOrObject parameter', function() {
			});
		});
	});
});