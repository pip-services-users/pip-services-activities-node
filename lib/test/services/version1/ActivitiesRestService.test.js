"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var ActivitiesMemoryPersistence_1 = require('../../../src/persistence/ActivitiesMemoryPersistence');
var ActivitiesController_1 = require('../../../src/logic/ActivitiesController');
var ActivitiesRestService_1 = require('../../../src/services/version1/ActivitiesRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var ACTIVITY = {
    type: 'test',
    party: {
        id: '1',
        name: 'Test User'
    },
    ref_item: {
        id: '2',
        type: 'party',
        name: 'Admin User'
    }
};
suite('ActivitiesRestService', function () {
    var db = new ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new ActivitiesController_1.ActivitiesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new ActivitiesRestService_1.ActivitiesRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Batch Party Activities', function (done) {
        async.series([
            // Log an activity batch
            function (callback) {
                rest.post('/activities/batch', [
                    ACTIVITY,
                    ACTIVITY,
                    ACTIVITY
                ], function (err, req, res) {
                    assert.isNotNull(err);
                    assert.equal(err.statusCode, 404);
                    callback();
                });
            },
            // Get activities
            function (callback) {
                rest.get('/activities/1', function (err, req, res, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.isTrue(activities.data.length > 2);
                    var activity = activities.data[0];
                    assert.equal(activity.type, ACTIVITY.type);
                    assert.isNotNull(activity.time);
                    assert.equal(activity.party.name, ACTIVITY.party.name);
                    callback();
                });
            }
        ], done);
    });
});
