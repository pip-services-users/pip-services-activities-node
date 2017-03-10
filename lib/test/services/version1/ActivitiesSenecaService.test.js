"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var ActivitiesMemoryPersistence_1 = require('../../../src/persistence/ActivitiesMemoryPersistence');
var ActivitiesController_1 = require('../../../src/logic/ActivitiesController');
var ActivitiesSenecaService_1 = require('../../../src/services/version1/ActivitiesSenecaService');
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
suite('ActivitiesSenecaService', function () {
    var db = new ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new ActivitiesController_1.ActivitiesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new ActivitiesSenecaService_1.ActivitiesSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Batch Party Activities', function (done) {
        async.series([
            // Log an activity batch
            function (callback) {
                seneca.getSeneca().act({
                    role: 'activities',
                    cmd: 'batch_party_activities',
                    activities: [
                        ACTIVITY,
                        ACTIVITY,
                        ACTIVITY
                    ]
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get activities
            function (callback) {
                seneca.getSeneca().act({
                    role: 'activities',
                    cmd: 'get_party_activities',
                    filter: {
                        party_id: '1'
                    }
                }, function (err, activities) {
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
