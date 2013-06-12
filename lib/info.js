//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//The info module will read values from the package.json file.
//This will be loaded synchronously, but since this only will happen on first
//require if this module thats ok (nodejs modules are getting cached).
var packageJSON = require('../package.json');

//Use the config system to read component id.
var config = require('./config');

//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the getName function.
exports.getName = getName;

//Expose the getVersion function.
exports.getVersion = getVersion;

//Expose the getID function.

//-----------------------------------------------
// Public functions
//-----------------------------------------------

/**
 * A function to get the name of the component specified in package.json. 
 *
 * @return The component name specifeid in package.json.
 * 
 * @throws If the name read is not a string.
 */
function getName() {
  //Store the name of the package.json.
  var name = packageJSON['name'];

  //Check so that the 'name' is a string.
  if(typeof name !== 'string') {
    //The 'name' is not a string.

    //Throw an error to indicate this.
    throw new Error('The name of the component read from package.json is invalid (not string). Name: ' + name);
  }

  //Simply return the name.
  return name;
}

/**
 * Function to get the version of the component specified in package.json.
 *
 * @option {numerical}  If 'numerical' is set to 'true', then the optional 'v' of the version will be stripped.	
 *
 * @return              The component version specified in package.json.
 *
 * @throws              If the version is not a string or number.
 */
function getVersion(numerical) {
  //Get the version specified in package.json.
  var version = packageJSON['version'];

  //Check if the type of version.
  if(typeof version !== 'string' && typeof version !== 'number') {
    //The version is an invalid type.

    //Throw an error to indicate this.
    throw new Error('The version of the component read from package.json is invalid (not string or number). Version: ' + version);
  }

  //Check if numerical version is requested.
  if(numerical === true) {
    //The 'v' from the version should be stripped away.

    //Check if the first character is a 'v'.
    if(version.charAt(0) === 'v') {
      //Then strip it away.

      //Remove the first letter.
      version = version.substr(1);
    }
  }

  //Return the version variable after potential modifications.
  return version;
}