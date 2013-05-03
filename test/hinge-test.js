/*jslint maxlen:140*/
/* global require */
'use strict';

var buster = require('buster'),
    Hinge = require('../lib/hinge')
;

var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase('REST API', {
    'should throw an error if it is instantized without a resource': function () {
        assert.exception(function() {
            var test = new Hinge({});
        });
    },

    'should accept a GET handler': function () {
        var test = new Hinge({
            resource: {},
            GET: function(done) { done(); }
        });

        assert.isFunction(test.GET);
    },

    'should accept a POST handler': function () {
        var test = new Hinge({
            resource: {},
            POST: function(done) { done(); }
        });

        assert.isFunction(test.POST);
    },

    'should accept a PUT handler': function () {
        var test = new Hinge({
            resource: {},
            PUT: function() { return 'PUT'; }
        });

        assert.isFunction(test.PUT);
    },

    'should accept a DELETE handler': function () {
        var test = new Hinge({
            resource: {},
            DELETE: function() { return 'DELETE'; }
        });

        assert.isFunction(test.DELETE);
    }
});

buster.testCase('A GET handler', {
    'should ensure that there is a URI': function () {
        var test = new Hinge({
            resource: {},
            GET: function () {
            }
        });

        assert.exception(function() {
            test.GET();
        });
        assert.exception(function() {
            test.GET({}, function() {});
        });

    },
    'should ensure that there it has a callback': function () {
        var test = new Hinge({
            resource: {},
            GET: function (uri, query, done) {
                done(null);
            }
        });

        // with no params object
        assert.exception(function() {
            test.GET('/api/foo');
        });

        // if there is a params object
        assert.exception(function() {
            test.GET('/api/foo', {});
        });
    }

});

buster.testCase('A POST handler', {
    'should ensure that there is a URI': function () {
        var test = new Hinge({
            resource: {},
            POST: function () {
            }
        });

        assert.exception(function() {
            test.POST();
        });
        assert.exception(function() {
            test.POST({}, function() {});
        });
    }

});

buster.testCase('A PUT handler', {
    'should ensure that there is a URI': function () {
        var test = new Hinge({
            resource: {},
            PUT: function () {
            }
        });

        assert.exception(function() {
            test.PUT();
        });
        assert.exception(function() {
            test.PUT({}, function() {});
        });
    }
});

buster.testCase('A DELETE handler', {
    'should ensure that there is a URI': function () {
        var test = new Hinge({
            resource: {},
            DELETE: function () {
            }
        });

        assert.exception(function() {
            test.DELETE();
        });
        assert.exception(function() {
            test.DELETE({}, function() {});
        });
    }
});
