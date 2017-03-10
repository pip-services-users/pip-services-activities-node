"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var ActivitiesMongoDbPersistence_1 = require('../../src/persistence/ActivitiesMongoDbPersistence');
var ActivitiesPersistenceFixture_1 = require('./ActivitiesPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('ActivitiesMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new ActivitiesMongoDbPersistence_1.ActivitiesMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new ActivitiesPersistenceFixture_1.ActivitiesPersistenceFixture(db);
    suiteSetup(function (done) {
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
