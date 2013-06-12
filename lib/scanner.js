//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Require the utils library to use the validate function.
var utils = require('./utils');

//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the Scan constructor
module.exports = Scanner;

//-----------------------------------------------
// Class definition
//-----------------------------------------------

/**
 * Constructor for a scan instance that controls a webbrowser to perform website scans.
 *
 * @param   {options}   The options object that holds the options for the scan instance.
 * @options {logger}    The logger object to be used. If 'false', no logging will be done. Default is 'false'.
 *                      The logger must have a function 'log' defined which follows the interface as the 'winston' module.
 *
 * @throws              If options are invalid.
 */
function Scanner(options) {
  //Validate the options parameter.
  options = utils.validate(options, {}, 'object');

  //Validate the logger option and store it to as a member variable of Scan.
  this.logger = utils.validate(options.logger, false, utils.validators.falseOrObject({ log: 'function' }));
}

//Save a variable for the class prototype for convenience.
var p = Scanner.prototype;

//-----------------------------------------------
// Public functions
//-----------------------------------------------