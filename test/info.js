//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Test will use expect.js
var expect = require('expect.js');

//Tests the info module, so require it.
var info = require('../lib/info');

//Will cross reference with package.json for expectation checks.
var packageJSON = require('../package.json');

//-----------------------------------------------
// Tests
//-----------------------------------------------

//Info tests.
describe('info', function() {

	//Test getName() function.
	describe('getName()', function() {
		it('should be a function', function() {
			//There should be a function named getName.
			expect(info.getName).to.be.a('function');	
		});

		it('should return equal to package.json name field', function() {
			//The name of this particular component is expected to be the same stated as "name" in package.json.
			expect(info.getName()).to.be(packageJSON['name']);
		});
	});

	//Test getVersion(numerical) function.
	describe('getVersion(numerical)', function() {
		it('should be a function', function() {
			//There should be a function named getVersion.
			expect(info.getVersion).to.be.a('function');
		});

		it('should return version as given in package.json', function() {
			//Call to this function is expected to retrieve version as given in package.json "version" field.
			expect(info.getVersion()).to.be(packageJSON['version']);
		});
		
		it('should return a numerical version if numerical parameter us true', function() {
			//Call to this function with numerical = true, should strip the 'v' out of the version if present.

			//First retrieve the version without the 'v'.
			var version = info.getVersion(true);

			//If 'v' is present in real version field, then the version variable length should be less than info.getVersion().
			if(version.length < info.getVersion().length) {
				//This is the case. 'v' is present in real version field.

				//This means that version without the 'v' prepended with 'v' should equal the original version.
				expect('v' + version).to.be(info.getVersion());
			} else {
				//The are the same size, and should therefore be equal.
				expect(version).to.be(info.getVersion());
			}
		});
	});
});