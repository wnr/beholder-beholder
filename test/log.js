//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//The test will use expect to validate.
var expect = require('expect.js');

//The log object to be tested.
var log = require('../lib/log.js');

//Require 'winston' to compare with the object created by log.js.
var winston = require('winston');

//-----------------------------------------------
// Tests
//-----------------------------------------------

describe('log', function() {
	describe('init()', function() {
		it('should be a function', function() {
			//The init function should be defined.
			expect(log.init).to.be.a('function');
		});

		it('should init with default values', function() {
			//Init a new instance.
			var logger = log.init();

			//Option 'colorize' should be defaulted to 'true'.
			testTransportsProperty(logger, 'colorize', true);

			//Option 'timestamp' should be defaulted to 'true'.
			testTransportsProperty(logger, 'timestamp', true);

			//Option 'console' should be defaulted to 'true', and therefore the instance should be logging to console.
			expect(logger._names).to.contain('console');

			//Option 'file' should be defaulted to 'false', and therefore the instance should not be logging to file.
			expect(logger._names).to.not.contain('file');			
		});

		it('should respond to option:colorize', function() {			
			//Variable to hold 'logger' instances.
			var logger;

			//Create an instance with 'colorize' set to 'false'.
			logger = log.init({ colorize: false });

			//Test the properties of all transports to be affected by the 'colorize' option.
			testTransportsProperty(logger, 'colorize', false);

			//Create an instance with 'colorize' set to true.
			logger = log.init({ colorize: false });

			//Test the properties of all transports to be affected by the 'colorize' option.
			testTransportsProperty(logger, 'colorize', false);

			//Create an instance with 'colorize' set to 'false' and with 'file' to '/tmp/test.txt'.
			logger = log.init({ colorize: false, file: '/tmp/test.txt' });

			//The 'colorize' property should be false for all transports.
			testTransportsProperty(logger, 'colorize', false);
		});

		it('should respond to option:timestamp', function() {
			//Variable to hold 'logger' instances.
			var logger;

			//Create an instance with 'timestamp' set to 'false'.
			logger = log.init({ timestamp: false });

			//Test the properties of all transports to be affected by the 'timestamp' option.
			testTransportsProperty(logger, 'timestamp', false);

			//Create an instance with 'timestamp' set to true.
			logger = log.init({ timestamp: false });

			//Test the properties of all transports to be affected by the 'timestamp' option.
			testTransportsProperty(logger, 'timestamp', false);

			//Create an instance with 'timestamp' set to 'false' and with 'file' to '/tmp/test.txt'.
			logger = log.init({ timestamp: false, file: '/tmp/test.txt' });

			//The 'timestamp' property should be false for all transports.
			testTransportsProperty(logger, 'timestamp', false);
		});

		it('should respond to option:console', function() {
			//Variable to hold 'logger' instances.
			var logger;

			//Create an instance with 'console' set to 'false'.
			logger = log.init({ console: false });

			//Expect it not to have a console transport.
			expect(logger._names).to.not.contain('console');

			//Create an instance with 'console' set to 'true'.
			logger = log.init({ console: true });

			//Expect it to have a console transport.
			expect(logger._names).to.contain('console');
		});

		it('should respond to option:file', function() {
			//Variable to hold 'logger' instances.
			var logger;

			//Create an instance with 'file' set to 'false'.
			logger = log.init({ file: false });

			//Expect it not to have a file transport.
			expect(logger._names).to.not.contain('file');

			//Create an instance with 'file' set to '/tmp/test.txt'.
			logger = log.init({ file: '/tmp/test.txt' });

			//Expect it to have a file transport.
			expect(logger._names).to.contain('file');

			//Test for right filename. Winston strips the last / so add it while testing.
			expect(logger.transports.file.dirname + '/' + logger.transports.file.filename).to.equal('/tmp/test.txt');
		});

		it('should throw errors on invalid options', function() {
			//Variable to hold 'logger' instances.
			var logger;

			//Expect init to throw error when 'colorize' is not a boolean.
			expect(function() { log.init({ colorize: 'not boolean' }); }).to.throwError();

			//Expect init to throw error when 'timestamp' is not a boolean.
			expect(function() { log.init({ timestamp: 'not boolean' }); }).to.throwError();

			//Expect init to throw error when 'console' is not a boolean.
			expect(function() { log.init({ console: 'not boolean' }); }).to.throwError();

			//Expect init to throw error when 'file' is not a string.
			expect(function() { log.init({ file: true }); }).to.throwError();
		});
	})
});

//-----------------------------------------------
// Private functions
//-----------------------------------------------

/**
 * Function to test transports properties of a logger instance.
 *
 * @param {logger} 			The instance of the logger to be tested.
 * @param {property} 		The property to be tested of the logger's transports.
 * @param {value}				The value that the property should equal.
 */
function testTransportsProperty(logger, property, value) {
	//Loop through all transports of the logger object.
	for (var i = logger.transports.length - 1; i >= 0; i--) {
		//Expect the value of transports object 'property' to be same as 'value'.
		expect(logger.transports[i][property]).to.equal(value);
	};
}