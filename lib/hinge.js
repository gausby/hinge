/* global require module */
'use strict';

/**
 * Creating an empty function that is used if a method has been left
 * unimplemented.
 *
 * It will analyse its input params and use the last passed param as
 * a callback function, if it is a function.
 *
 * @method noop
 * @return {Undefined} Nothing
 */
function noop () {
    // the last argument parsed should be treated as a callback
    // function, if it is a function.
    if (typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1]();
    }

    return undefined;
}


/**
 * A simple class that handle HTTP style methods, such as GET, PUT,
 * POST and DELETE, and binds the execution context of these to a
 * given resource object.
 *
 * To create an API that serves the values of keys in an Object, type
 * something like this:
 *
 *     var Hinge = require('hinge');
 *
 *     var api = new Hinge({
 *         // This will use a literal JavaScript object as the
 *         // storage resource. This could just as well be some
 *         // kind of database object. `this` within the given
 *         // GET-, PUT-, POST-, and DELETE functions will refer
 *         // to `resource`.
 *         resource: {
 *             'foo': 'bar'
 *         },
 *
 *         // Will handle GET requests send to the API.
 *         GET: function (uri, done) {
 *             if (uri in this) {
 *                 done(null, this[uri]);
 *             }
 *             else {
 *                 done('404');
 *             }
 *         }
 *     });
 *
 *     api.GET('foo', function(err, value) {
 *         // would print `bar`
 *         console.log(value);
 *     });
 *
 * @class Hinge
 * @constructor
 * @param {Object} config
 * @param {Function} [config.GET=noop] Function to execute when the API
 *   receives a GET request.
 * @param {Function} [config.PUT=noop] Function to execute when the API
 *   recieves a PUT request.
 * @param {Function} [config.POST=noop] Function to execute when the API
 *   recieves a POST request.
 * @param {Function} [config.DELETE=noop] Function to execute when the API
 *   recieves a DELETE request.
 * @param {Function} config.resource Object to use as the context when
 *   executing any of the API methods.
 * @return {Undefined}
 */
function Hinge (config) {
    // resource
    if (! ('resource' in config)) {
        throw new Error('API initialized without a resource.');
    }

    this.resource = config.resource;

    this.fn = {
        GET: (typeof config.GET === 'function') ? config.GET.bind(this.resource) : noop,
        POST: (typeof config.POST === 'function') ? config.POST.bind(this.resource) : noop,
        PUT: (typeof config.PUT === 'function') ? config.PUT.bind(this.resource) : noop,
        DELETE: (typeof config.DELETE === 'function') ? config.DELETE.bind(this.resource) : noop
    };
}

module.exports = Hinge;


/**
 * Handles the execution of the GET function that was passed during object
 * initialization. It requires at least a URI as the first argument, and a
 * function that can be used as a callback function as the last argument--Every
 * argument that you pass between the URI and the callback will get passed to
 * the GET handler.
 *
 * @method GET
 * @param {String} uri Name of the resource to fetch
 * @param {String|Object|Number|Function} [params]* params that will get passed
 *   to the given GET handler.
 * @param {Function} callback A callback that is called when the operation is done
 * @return The result of the GET function
 */
Hinge.prototype.GET = function (uri) {
    if (typeof uri !== 'string') {
        throw new Error('A GET request should have a URI as the first argument');
    }

    if (arguments.length === 1 || typeof arguments[arguments.length - 1] !== 'function') {
        throw new Error('A GET request should have a callback function as the last argument');
    }

    // pass the given arguments to the defined GET function
    return this.fn.GET.apply(undefined, arguments);
};


/**
 * Handles the execution of the PUT function that was passed during object
 * initialization.
 *
 * @method PUT
 * @param {String} uri The URI to store the given data in
 * @param {Object|String|Number|Function} data Data to store at the given URI
 * @param {Function} callback A callback that is called when the operation is done
 * @return The result of the PUT function
 */
Hinge.prototype.PUT = function (uri, data, callback) {
    if (typeof uri !== 'string') {
        throw new Error('A PUT request should have a URI as the first argument');
    }

    if (typeof callback !== 'function') {
        throw new Error('A PUT request should have a callback function as its last argument');
    }

    return this.fn.PUT(uri, data, callback);
};


/**
 * Handles the execution of the POST function that was passed during object
 * initialization.
 *
 * @method POST
 * @param {String} uri
 * @param {Object|String|Number|Function} data Data to store at the given URI
 * @return The result of the POST function
 */
Hinge.prototype.POST = function (uri, data, callback) {
    if (typeof uri !== 'string') {
        throw new Error('A GET request should have a URI as the first argument');
    }

    return this.fn.POST(uri, data, callback);
};


/**
 * Handles the execution of the DELETE function that was passed during object
 * initialization.
 *
 * @method DELETE
 * @param {String} uri
 * @return The result of the DELETE function
 */
Hinge.prototype.DELETE = function (uri) {
    if (typeof uri !== 'string') {
        throw new Error('A GET request should have a URI as the first argument');
    }

    return this.fn.DELETE(uri, arguments[1]);
};
