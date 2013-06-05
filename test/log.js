//Since the logger object relies on config values on init, the test checks the values used in the config.
var config = require('../lib/config.js');

//The test will use expect to validate.
var expect = require('expect.js');

//Filename depends on info module, so require it.
var info = require('../lib/info.js');

//The logger to be tested. This should not be used in the tests directly since it need to
//be reinitialized on config changes. Use getLogger function.
var _logger = require('../lib/log.js');

//A function to require and return the newly initialized logger object.
function getLogger() {
	//Reinitialize the required _logger object and return it.
	return _logger.init();
};

//Tests for the lib/logs.js file.
describe('log', function() {
	//Test the default configs.

	it('should respond to config:logs:colorize', function() {
		//Test setting colorize to false.
		testTransportsProperty(false, 'colorize');

		//Test setting colorize to true.
		testTransportsProperty(true, 'colorize');
	});

	it('should respond to config:logs:timestamp', function() {
		//Test setting timestamp to false.
		testTransportsProperty(false, 'timestamp');

		//test setting timestamp to true.
		testTransportsProperty(true, 'timestamp');
	});

	it('should respond to config:logs:log_to_console', function() {
		//Set config to not log to console.
		config.set('logs:log_to_console', false);

		//Require the logger.
		var logger = getLogger();

		//Expect it not to have a console logger.
		expect(logger._names).to.not.contain('console');

		//Set config to log to console.
		config.set('logs:log_to_console', true);

		//Test the console transport.
		testTransportConfigProperties('console');
	});

	it('should respond to config:logs:log_to_file', function() {
		//Set config to not log to file.
		config.set('logs:log_to_file', false);

		//Require the logger.
		var logger = getLogger();

		//Expect it not to contain the file transport object.
		expect(logger._names).to.not.contain('file');

		//Set config to log to a combined file with basedir /tmp/.
		config.set('logs:log_to_file', true);
		config.set('logs:basedir', '/tmp/');
		config.set('logs:combined', true);

		//Expect a file transport to exist with right properties.
		testTransportConfigProperties('file');

		//Get the logger object.
		logger = getLogger();

		//Test for right filepath. Winston strips the last / so add it while testing.
		expect(logger.transports.file.dirname + '/').to.equal(config.get('logs:basedir'));

		//Test for right filename.
		expect(logger.transports.file.filename).to.equal(info.getName() + '-' + info.getID() + '.log');
	});
});

//Function to test all transports in the logger object to see if they respond to config values.
//Will force config value to <value> and then expect the property <property> of all transports
//To be the same value <value>. The is set to "logs:<configName>", and if no <configName> is given
//then <configName> = <property>.
function testTransportsProperty(value, property, configName) {
	//Check if configName is not set.
	if(configName === undefined) {
		//Set it to same as property.
		configName = property;
	}

	//Force config to set logs:<configName> to parameter value.
	config.set('logs:' + configName, value);

	//Require the logger object.
	var logger = getLogger();

	//This should the affect the property object of all transports. Loop through all transports.
	for (var i = logger.transports.length - 1; i >= 0; i--) {
		//Expect the value of transports object <property> to be same as set in config.
		expect(logger.transports[i][property]).to.equal(value);
	};
};

//Function to test if the given transport exists in the logger object and that the
//properties matches with the ones given in the config.
function testTransportConfigProperties(transport) {
	//Get a freshly initialized logger object.
	var logger = getLogger();

	//Expect the logger to contain the transport.
	expect(logger._names).to.contain(transport);

	//Then it should also exist a transports object with the same name.
	expect(logger.transports[transport]).to.be.an('object');

	//Expect the colorize property to be the same as set in config.
	expect(logger.transports[transport].colorize).to.equal(config.get('logs:colorize'));

	//Expect the timestamp property to be the same as set in config.
	expect(logger.transports[transport].timestamp).to.equal(config.get('logs:timestamp'));
};