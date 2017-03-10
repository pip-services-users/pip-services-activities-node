"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var ActivitiesLambdaFunction_1 = require('../../src/run/ActivitiesLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});
suite('ActivitiesLambdaFunction', function () {
    var lambda = new ActivitiesLambdaFunction_1.ActivitiesLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        // done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            cmd: 'get_party_activities',
            filter: {
                party_id: '2'
            }
        }, {
            done: function (err, activities) {
                assert.isNull(err);
                assert.isObject(activities);
                done();
            }
        });
    });
});
