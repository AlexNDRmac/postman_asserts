# Postman Asserts | provide a clean way to organise tests

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

 - Save content of `pm_asserts.js` script as a global variable
 - In the Postman `Test scripts` - eval `postman_asserts` global variable
 - Call Asserts functions by functions' name

## License

This project is open source software licensed under the GNU General Public Licence version 3.
