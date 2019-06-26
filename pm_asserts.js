/**
 * This script defines global variables to provide Asserts for Postman unit test case Runner.
 */

/** Check if Response have JSON body */
function isJsonResponse() {
    pm.test('Response should have JSON Body', function () {
        pm.response.to.have.jsonBody();
    });
}

/** Check if Response have expected Status Code */
function isResponseStatus(statusCode) {
    pm.test('Status code is ' + statusCode, function () {
        pm.response.to.have.status(statusCode);
    });
}

/** Validate JSON Response with Tiny Validator (tv4, built-in into Postman), using JSON Schema */
function validateJsonSchema(schema) {
    tests["Response Data is Valid"] = tv4.validate(pm.response.json(), schema);

    if (tv4.error !== null) {
        tests["Validation ERROR => " + tv4.error.message] = "";
    }
}

/** Check if two agruments are Equals. Optional: message - you can provide your custom text */
function isEquals(expected, actual, message) {
    message = message || 'Expected value is Equals to actual';

    pm.test(message, function () {
        pm.expect(expected).to.eql(actual);
    });
}

/** Check if Raw Response Body Contains `needle`. Optional: message - you can provide your custom text */
function isRawResponseBodyContains(needle, message) {
    message = message || 'Raw Response Body contains ' + needle;

    pm.test(message, function () {
        pm.expect(pm.response.text()).to.include(needle);
    });
}

/**
 * Set up and Validate Variable from Response to local ENV
 *
 * @param {string} localVar - Postman ENV variable name
 * @param {string} index    - index (dot notation)
 * @param {object} jsonData - pm.response Object
 */
function ensureEnv(localVar, index, jsonData) {
    jsonValue = _.get(jsonData, index);

    pm.environment.unset(localVar);
    pm.environment.set(localVar, jsonValue);

    envValue = pm.environment.get(localVar);
    message  = 'Variable is set to ENV: ' + localVar + ' = ' + envValue;

    pm.test(message, function () {
        pm.expect(jsonValue).to.eql(envValue);
    });
}
