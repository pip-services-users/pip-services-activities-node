let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesSenecaService } from '../../../src/services/version1/ActivitiesSenecaService';

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

suite('ActivitiesSenecaService', ()=> {        
    let db = new ActivitiesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new ActivitiesController();
    ctrl.configure(new ComponentConfig());

    let service = new ActivitiesSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'activities',
                        cmd: 'batch_party_activities',

                        activities: [
                            ACTIVITY,
                            ACTIVITY,
                            ACTIVITY
                        ]
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Get activities
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'activities',
                        cmd: 'get_party_activities',
                        filter: {                        
                            party_id: '1'
                        }
                    },
                    (err, activities) => {                        
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