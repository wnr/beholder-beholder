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
});