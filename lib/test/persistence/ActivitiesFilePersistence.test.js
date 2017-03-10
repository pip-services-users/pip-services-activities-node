"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var ActivitiesFilePersistence_1 = require('../../src/persistence/ActivitiesFilePersistence');
var ActivitiesPersistenceFixture_1 = require('./ActivitiesPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/activities.test.json',
        data: []
    }
});
suite('ActivitiesFilePersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new ActivitiesFilePersistence_1.ActivitiesFilePersistence();
        db.configure(config);
        fixture = new ActivitiesPersistenceFixture_1.ActivitiesPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Log Party Activities', function (done) {
        fixture.testLogPartyActivities(done);
    });
    test('Get Party Activities', function (done) {
        fixture.testGetPartyActivities(done);
    });
});
