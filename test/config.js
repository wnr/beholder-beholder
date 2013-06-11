//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Require the 'config' module to be tested and store the init function.
var init = require('../lib/config').init;

//Require the 'expect' module to be used in tests.
var expect = require('expect.js');

//-----------------------------------------------
// Tests
//-----------------------------------------------

describe('config', function() {
	describe('init', function() {
		it('should init with default values', function() {
			//Init a new config instance.
			var config = init();

			//Extract the stores from nconf.
			var stores = Object.keys(config.stores);

			//There should be three stores defined.
			expect(stores).to.have.length(3);

			//The first one should be 'argv'.
			expect(stores[0]).to.equal('argv');

			//The second one should be 'config'.
			expect(stores[1]).to.equal('config');

			//The third one should be 'defaults'.
			expect(stores[2]).to.equal('defaults');

			//The 'config' store should read from the file './config.json'.
			expect(config.stores.config.file).to.equal('./config.json');

			//The 'config' store should read from the file './config_defaults.json'.
			expect(config.stores.defaults.file).to.equal('./config_defaults.json');
		});

		it('should respond to option:argv', function() {
			//Variable to hold 'config' instances.
			var config;

			//Init a new config instance with option 'argv' set to 'false'.
			config = init({ argv: false });

			//The argv store should not be present then.
			expect(Object.keys(config.stores)).to.not.contain('argv');

			//Init a new config instance with option 'argv' set to 'true'.
			config = init({ argv: true });

			//The argv store should be present then at the first priority.
			expect(Object.keys(config.stores)[0]).to.equal('argv');
		});

		it('should respond to option:config', function() {
			//Variable to hold 'config' instances.
			var config;

			//Init a new config instance with option 'config' set to 'false'.
			config = init({ config: false });

			//The 'config' store should not be present then.
			expect(Object.keys(config.stores)).to.not.contain('config');

			//Init a new config instance with option 'config' set to '/tmp/test.txt'.
			config = init({ config: '/tmp/test.txt' });

			//The 'config' store should be present then at the second priority.
			expect(Object.keys(config.stores)[1]).to.equal('config');

			//The 'config' store should read from the file '/tmp/test.txt'.
			expect(config.stores.config.file).to.equal('/tmp/test.txt');
		});

		it('should respond to option:defaults', function() {
			//Variable to hold 'config' instances.
			var config;

			//Init a new config instance with option 'defaults' set to 'false'.
			config = init({ defaults: false });

			//The 'defaults' store should not be present then.
			expect(Object.keys(config.stores)).to.not.contain('defaults');

			//Init a new config instance with option 'defaults' set to '/tmp/test.txt'.
			config = init({ defaults: '/tmp/test.txt' });

			//The 'defaults' store should be present then at the third priority.
			expect(Object.keys(config.stores)[2]).to.equal('defaults');

			//The 'defaults' store should read from the file '/tmp/test.txt'.
			expect(config.stores.defaults.file).to.equal('/tmp/test.txt');
		});

		it('should throw errors on invalid options', function() {
			//Expect init to throw error when 'argv' is not a boolean.
			expect(function() { init({ argv: 'not boolean' }); }).to.throwError();

			//Expect init to throw error when 'config' is not a string or false.
			expect(function() { log.init({ config: 1337 }); }).to.throwError();

			//Expect init to throw error when 'defaults' is not a string or false.
			expect(function() { log.init({ defaults: true }); }).to.throwError();
		});
	});
});