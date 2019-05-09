var functions = function loadAsserts() {
    var asserts = {};

    asserts.isJsonResponse = function isJsonResponse() {
        pm.test('Response should have JSON Body', function () {
            pm.response.to.have.jsonBody();
        });
    };

    asserts.isResponseStatus = function isResponseStatus(statusCode) {
        pm.test('Status code is ' + statusCode, function () {
            pm.response.to.have.status(statusCode);
        });
    };

    asserts.validateJsonSchema = function validateJsonSchema(schema) {
        tests["Response Data is Valid"] = tv4.validate(pm.response.json(), schema);

        if (tv4.error !== null) {
           tests["Validation ERROR => " + tv4.error.message] = "";
        }
    };

    asserts.isEquals = function isEquals(expected, actual, message) {
        message = message || 'Expected value is Equals to actual';

        pm.test(message, function () {
            pm.expect(expected).to.eql(actual);
        });
    };

    return asserts;
} + '; loadAsserts();';

var postmanAsserts = JSON.stringify(functions);

if (!pm.globals.has('postmanAsserts') || pm.globals.get('postmanAsserts') !== postmanAsserts) {
    pm.globals.set('postmanAsserts', postmanAsserts);

    tests['Set up Postman Asserts to Globals'] = pm.globals.has('postmanAsserts');
}
