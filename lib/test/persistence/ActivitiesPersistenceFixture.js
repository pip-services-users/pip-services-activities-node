"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
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
var ActivitiesPersistenceFixture = (function () {
    function ActivitiesPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    ActivitiesPersistenceFixture.prototype.testLogPartyActivities = function (done) {
        var _this = this;
        var activity1;
        async.series([
            // Log activity
            function (callback) {
                _this._db.logPartyActivity(null, ACTIVITY, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    activity1 = activity;
                    callback();
                });
            },
            // Check activity
            function (callback) {
                _this._db.getPartyActivities(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    id: activity1.id
                }), new pip_services_runtime_node_2.PagingParams(), function (err, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.lengthOf(activities.data, 1);
                    var activity = activities.data[0];
                    assert.isNotNull(activity.time);
                    assert.equal(activity.type, ACTIVITY.type);
                    assert.equal(activity.party.id, ACTIVITY.party.id);
                    assert.equal(activity.party.name, ACTIVITY.party.name);
                    assert.equal(activity.ref_item.id, ACTIVITY.ref_item.id);
                    assert.equal(activity.ref_item.name, ACTIVITY.ref_item.name);
                    callback();
                });
            }
        ], done);
    };
    ActivitiesPersistenceFixture.prototype.testGetPartyActivities = function (done) {
        var _this = this;
        async.series([
            // Log activity
            function (callback) {
                _this._db.logPartyActivity(null, ACTIVITY, function (err, activity) {
                    assert.isNull(err);
                    assert.isObject(activity);
                    callback();
                });
            },
            // Get activities
            function (callback) {
                _this._db.getPartyActivities(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    party_id: '1'
                }), new pip_services_runtime_node_2.PagingParams(), function (err, activities) {
                    assert.isNull(err);
                    assert.isObject(activities);
                    assert.isTrue(activities.data.length > 0);
                    var activity = activities.data[0];
                    assert.equal(activity.type, ACTIVITY.type);
                    assert.isNotNull(activity.time);
                    assert.equal(activity.party.name, ACTIVITY.party.name);
                    callback();
                });
            }
        ], done);
    };
    return ActivitiesPersistenceFixture;
}());
exports.ActivitiesPersistenceFixture = ActivitiesPersistenceFixture;
