let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IActivitiesPersistence } from '../../src/persistence/IActivitiesPersistence';

let ACTIVITY = {
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

export class ActivitiesPersistenceFixture {
    private _db: IActivitiesPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }
                
    testLogPartyActivities(done) {
        var activity1;

        async.series([
            // Log activity
            (callback) => {
                this._db.logPartyActivity(
                    null,
                    ACTIVITY,
                    (err, activity) => {
                        assert.isNull(err);

                        assert.isObject(activity);
                        activity1 = activity;

                        callback();
                    }
                );
            },
            // Check activity
            (callback) => {
                this._db.getPartyActivities(
                    null,
                    FilterParams.fromValue({
                        id: activity1.id
                    }),
                    new PagingParams(),
                    (err, activities) => {
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
                    }
                );
            }
        ], done);
    }

    testGetPartyActivities(done) {
        async.series([
            // Log activity
            (callback) => {
                this._db.logPartyActivity(
                    null,
                    ACTIVITY,
                    function (err, activity) {
                        assert.isNull(err);

                        assert.isObject(activity);
                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                this._db.getPartyActivities(
                    null,
                    FilterParams.fromValue({
                        party_id: '1'
                    }),
                    new PagingParams(),
                    (err, activities) => {
                        assert.isNull(err);

                        assert.isObject(activities);
                        assert.isTrue(activities.data.length > 0);

                        var activity = activities.data[0];
                        assert.equal(activity.type, ACTIVITY.type);
                        assert.isNotNull(activity.time);
                        assert.equal(activity.party.name, ACTIVITY.party.name);

                        callback();
                    }
                );
            }
        ], done);
    }

}
