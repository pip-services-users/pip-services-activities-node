"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var ActivitiesMemoryPersistence_1 = require('../../src/persistence/ActivitiesMemoryPersistence');
var ActivitiesPersistenceFixture_1 = require('./ActivitiesPersistenceFixture');
suite('ActivitiesMemoryPersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new ActivitiesMemoryPersistence_1.ActivitiesMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new ActivitiesPersistenceFixture_1.ActivitiesPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('Log Party Activities', function (done) {
        fixture.testLogPartyActivities(done);
    });
    test('Get Party Activities', function (done) {
        fixture.testGetPartyActivities(done);
    });
});
