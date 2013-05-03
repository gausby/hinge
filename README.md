# Hinge - A REST API Style Abstraction Class
A simple class that handle HTTP style methods, such as GET, PUT, POST and DELETE, and binds the execution context of these to a given resource object.

Use it to build quick and dirty prototypes that store and receive data using REST methods, and hook it up to a HTTP server, and/or another server types that implement one or more of the methods.

    var Hinge = require('hinge');

    var api = new Hinge({
        // This will use a literal JavaScript object as the
        // storage resource. This could just as well be some
        // kind of database object. `this` within the given
        // GET-, PUT-, POST-, and DELETE functions will refer
        // to this `resource`.
        resource: {},

        // Will handle GET requests send to the API.
        GET: function (uri, query, done) {
            if (uri in this) {
                done(null, this[uri]);
            }
            else {
                done('404');
            }
        },

        // Will handle POST requests send to the API.
        // The data in the POST at PUT handlers could be a buffer,
        // a stream, or something third, instead of a string.
        POST: function (uri, data, done) {
            this[uri] = data.toString();
            done(null, this[uri]);
        },

        PUT: function (uri, data, done) {
            this[uri] = data.toString();
            done(null, this[uri]);
        },

        // Will handle DELETE requests send to the API.
        DELETE: function (uri, done) {
            delete this[uri];
            done(null);
        }
    });

Notice. This library will not handle any type of security--You would have to take care of that yourself. For now it should only be used for writing quick and dirty prototypes.


## Todo

  * The test suit hasn't got full coverage.


## License
The MIT License (MIT)

Copyright (c) 2013 Martin Gausby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
