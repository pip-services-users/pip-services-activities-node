let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesRestService } from '../../../src/services/version1/ActivitiesRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

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

suite('ActivitiesRestService', ()=> {    
    let db = new ActivitiesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new ActivitiesController();
    ctrl.configure(new ComponentConfig());

    let service = new ActivitiesRestService();
    service.configure(restConfig);
    
    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                rest.post('/activities/batch',
                    [
                        ACTIVITY,
                        ACTIVITY,
                        ACTIVITY
                    ],
                    (err, req, res) => {
                        assert.isNotNull(err);
                        assert.equal(err.statusCode, 404);
                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                rest.get('/activities/1',
                    (err, req, res, activities) => {                        
                        assert.isNull(err);
                        
                        assert.isObject(activities);
                        assert.isTrue(activities.data.length > 2);

                        let activity = activities.data[0];
                        assert.equal(activity.type, ACTIVITY.type);
                        assert.isNotNull(activity.time);
                        assert.equal(activity.party.name, ACTIVITY.party.name);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});