let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { PartyActivityV1 } from '../../../src/data/version1/PartyActivityV1';
import { ActivitiesMemoryPersistence } from '../../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesController } from '../../../src/logic/ActivitiesController';
import { ActivitiesSenecaServiceV1 } from '../../../src/services/version1/ActivitiesSenecaServiceV1';

let ACTIVITY: PartyActivityV1 = {
    id: null,
    type: 'test',
    time: new Date(),
    party: {
        id: '1',
        type: 'party',
        name: 'Test User'
    },
    ref_item: {
        id: '2',
        type: 'party',
        name: 'Admin User'
    },
    ref_parents: [],
    ref_party: null,
    details: null
};

suite('ActivitiesSenecaServiceV1', ()=> {
    let seneca: any;
    let service: ActivitiesSenecaServiceV1;
    let persistence: ActivitiesMemoryPersistence;
    let controller: ActivitiesController;

    suiteSetup((done) => {
        persistence = new ActivitiesMemoryPersistence();
        controller = new ActivitiesController();

        service = new ActivitiesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-activities', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-activities', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('Batch Party Activities', (done) => {
        async.series([
            // Log an activity batch
            (callback) => {
                seneca.act(
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
                seneca.act(
                    {
                        role: 'activities',
                        cmd: 'get_party_activities',
                        filter: {                        
                            party_id: '1'
                        }
                    },
                    (err, page) => {                        
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.isTrue(page.data.length > 2);

                        let activity = page.data[0];
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