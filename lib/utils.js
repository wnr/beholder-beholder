//-----------------------------------------------
// Public functions
//-----------------------------------------------

/**
 * Validates a value. If the value is unset, a given default value is set.
 *
 * @param {actual}		The actual value of the value.
 * @param {def}				The def value to set to the value if the 'actual' variable is unset.
 * @param {validator} The function to do the validating. The function should accept the 'actual' 
 *										value as the only argument and return a boolean indicating if the value is valid or not.
 *										If 'validator' is a string, then the string will be used in the default validator function.
 *										The default validator function will test so that the type of the actual is the type specified by the
 *										string of 'validator'.
 *										If unset, no validating will be done.
 *
 * @return 						The 'actual' value if it is valid. The 'def' value if the 'actual' value is unset. 
 * 
 * @throws						If the option is of wrong type or when both 'actual' and 'def' are unset.
 */
function validate(actual, def, validator) {
	// Check if the 'actual' value is unset.
	if(actual === undefined) {
		//The 'actual' value is not set.

		//Check if the 'def' value is unset.
		if(def === undefined) {
			//The 'def' value is not set.

			//This is illegal. Throw an error.
			throw new Error('Both actual and def value cannot be undefined.');
		} else {
			//The 'def' value is set.

			//Return the 'def' value since the 'actual' value is not set.
			return def;
		}
	} else {
		//The 'actual' value is set.

		//Check if the 'validator' value is unset.
		if(validator === undefined) {
			//The 'validator' function is unset. No validating should then be done.

			//Just return the 'actual' value.
			return actual;
		} else {
			//The 'validator' value is set.

			//The variable to indicate if the 'actual' value is valid or not.
			var valid;

			//Check if the 'validator' is a function.
			if(typeof validator === 'function') {
				//The 'validator' is a function.
			
				//Validate the 'actual' value.
				valid = validator(actual);
			} else if(typeof validator === 'string') {
				//The 'validator' is a string and should be used with the defaultValidator function.

				//Validate the actual value with the default validator.
				valid = validators.type(validator)(actual);
			} else {
				//The 'validator' is not a function.

				//Throw an error.
				throw new Error('The given validator is not a function. Given validator: ' + validator);
			}

			//Check if the 'actual' value is valid.
			if(valid === true) {
				//The 'actual' value is valid.

				//Return the 'actual' value.
				return actual;
			} else {
				//The actual value is invalid.

				//Throw an error.
				throw new Error('Value is invalid: ' + actual);
			}
		}
	}
}

//-----------------------------------------------
// Public objects
//-----------------------------------------------

/**
 * An object containing various validator functions to be passed to the 'validate' function.
 */
var validators = {
	/**
	 * Will check if the typeof 'actual' is the given type.
	 *
	 * @param {type} 	The type that the 'actual' value should be.
	 *
	 * @return 				A 'validator' function that performs the check.
	 *
	 * @throws				If 'type' is not a string.
	 */
	type: function(type) {
		//The actual validator function to be returned.
		function validator(actual) {
			//Check if the type of actual is type.
			if(typeof actual === type) {
				//The actual value have the type specified by 'type'.

				//Return true to indicate valid 'actual' value.
				return true;
			}

			//The actual have an invalid type. Return false to indicate this.
			return false;
		}

		//Check the type of the parameter 'type'.
		if(typeof type !== 'string') {
			//It is not of type 'string'.

			//The type specified must be a string, throw an error to indicate this.
			throw new Error('Invalid type (must be string). Type: ' + typeof type);
		}

		//Return the validator function.
		return validator;
	},

	/**
	 * Will check if the typeof 'actual' is the given type or if the value of 'actual' is 'false'.
	 *
	 * @param {type} 	The type that the 'actual' value should be if it is not 'false'.
	 *
	 * @return 				A 'validator' function that performs the check.
	 *
	 * @throws				If 'type' is not a string.
	 */
	typeOrFalse: function(type) {
		//The actual validator function to be returned.
		function validator(actual) {
			//Either the actual should have the right type or it should be false. Use the 'type' function defiend above to
			//check for the type. If the value is not fase, then check for the type.
			return actual === false || validators.type(type)(actual); 
		}

		//Check the type of the parameter 'type'.
		if(typeof type !== 'string') {
			//It is not of type 'string'.

			//The type specified must be a string, throw an error to indicate this.
			throw new Error('Invalid type (must be string). Type: ' + typeof type);
		}

		//Return the validator function.
		return validator;
	},

	/**
	 * Will check if the 'actual' value is false, or if it is an object with properties defined described by
	 * the 'properties' parameter.
	 *
	 * @param {properties}		An object whose indices should exist in the 'actual' object with the type of the value
	 *												associated with a specific index.
	 *
	 * @return 								A 'validator' function that performs the check. 
	 */
	falseOrObject: function(properties) {
		//The actual validator function to be returned.
		function validator(actual) {
			//First check if the value is false.
			if(actual === false) {
				//The actual value is false.

				//Since this is valid, return true to indicate this.
				return true;
			}

			//Check so that the type is 'object'.
			if(validators.type('object')(actual) === false) {
				//It is not an object and the value of 'actual' is not false.

				//Return false to indicate that the actual value is invalid.
				return false;
			}

			//Loop through all indices of the properties parameter.
			for(var property in properties) {
				//The typeof 'property' must be a string.
				if(typeof property !== 'string') {
					//The property is not a string.

					//Throw a new error to indicate this error.
					throw new Error('Invalid property defined in properties parameter (Each property must have a string value). Property: ' + typeof property);
				}

				//Check so that the property exists in 'actual' object and that it have the right type (which the property of properties will hold as value).
				if(validators.type(properties[property])(actual[property]) === false) {
					//The property does not exist in 'actual' with valid type.

					//Return false to indicate this.
					return false;
				}

				//Everything seems right. Return true to indicate that actual is a valid object.
				return true;
			}
		}

		//Just return the validator function.
		return validator;
	}
};

//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the 'validate' function.
exports.validate = validate;

//Expose the object containing predefined validators.
exports.validators = validators;