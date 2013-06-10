//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the 'validate' function.
exports.validate = validate;

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
	/**
	 * The default validator to be used. Will check if the typeof actual is the given type.
	 */
	function defaultValidator(actual, type) {
		//Check if the type of actual is type.
		if(typeof actual === type) {
			//The actual value have the type specified by 'type'.

			//Return true to indicate valid actual value.
			return true;
		}

		//The actual have an invalid type. Return false to indicate this.
		return false;
	}

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
				valid = defaultValidator(actual, validator);
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