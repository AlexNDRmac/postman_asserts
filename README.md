# Postman Asserts | provide a clean way to organise tests

[![Build status][actions build badge]][actions build link]

If you want use Tests inside Postman, you must always write assertions like this:

```javascript
pm.test('Response should have JSON Body', function () {
    pm.response.to.have.jsonBody();
});

// or
tests["Response Data is Valid"] = tv4.validate(pm.response.json(), schema);
```

It will be better if we can use `Reusable functions` inside Postman. It's more flexible...

## Writing tests within Postman Reusable functions

To have Assertions inside your Collection, you need to do next steps:

 - Save content of `pm_asserts.min.js` script as a global variable
 - In the Postman `Test scripts` - eval `postman_asserts` global variable
 - Call Asserts functions by functions' name

### Setting up Assertions Script to Postman Globals

To set up Assertions - just download [Collection](./PostmanAssertsInit.postman_collection.json) and make API call with it. This Request will get Script content and set up Global variable into Postman Environment.

### Using Assertions inside Postman Tests

Into `Tests` window call Assertions after `eval()` Postman Globals variable, which contains Script body.

```javascript
eval(globals.postman_asserts);

const schema = {
    "type": "object",
    "required": ['args', 'headers']
};

isJsonResponse();
isResponseStatus(200);
validateJsonSchema(schema);
```

## License

This project is open source software licensed under the GNU General Public Licence version 3.


[actions build badge]: https://github.com/AlexNDRmac/postman_asserts/workflows/Postman%20Tests/badge.svg "Build status"
[actions build link]: https://github.com/AlexNDRmac/postman_asserts/actions
