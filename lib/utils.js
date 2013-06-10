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

		//Check if the 'validator' function is unset.
		if(validator === undefined) {
			//The 'validator' function is unset. No validating should then be done.

			//Just return the 'actual' value.
			return actual;
		} else {
			//The 'validator' function is set.

			//Check if the 'validator' is a function.
			if(typeof validator === 'function') {
				//The 'validator' is a function.
			
				//Validate the 'actual' value.
				var valid = validator(actual);

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
			} else {
				//The 'validator' is not a function.

				//Throw an error.
				throw new Error('The given validator is not a function. Given validator: ' + validator);
			}
		}
	}
}