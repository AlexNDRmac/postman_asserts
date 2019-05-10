/**
 * This script defines global variables to provide Asserts for Postman unit test case Runner.
 */

function isJsonResponse() {
    pm.test('Response should have JSON Body', function () {
        pm.response.to.have.jsonBody();
    });
}

function isResponseStatus(statusCode) {
    pm.test('Status code is ' + statusCode, function () {
        pm.response.to.have.status(statusCode);
    });
}

function validateJsonSchema(schema) {
    tests["Response Data is Valid"] = tv4.validate(pm.response.json(), schema);

    if (tv4.error !== null) {
        tests["Validation ERROR => " + tv4.error.message] = "";
    }
}
function isEquals(expected, actual, message) {
    message = message || 'Expected value is Equals to actual';

    pm.test(message, function () {
        pm.expect(expected).to.eql(actual);
    });
}
