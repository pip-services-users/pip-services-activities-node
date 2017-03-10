"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var ActivitiesSenecaPlugin_1 = require('../../src/run/ActivitiesSenecaPlugin');
var buildConfig = {
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
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('ActivitiesSenecaPlugin', function () {
    var seneca;
    var plugin = new ActivitiesSenecaPlugin_1.ActivitiesSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'activities',
            cmd: 'get_party_activities',
            filter: {
                party_id: '2'
            }
        }, function (err, activities) {
            assert.isNull(err);
            assert.isObject(activities);
            done();
        });
    });
});
