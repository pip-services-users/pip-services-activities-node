import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { ActivitiesFilePersistence } from '../../src/persistence/ActivitiesFilePersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/activities.test.json',
        data: []
    }
});

suite('ActivitiesFilePersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new ActivitiesFilePersistence();
        db.configure(config);

        fixture = new ActivitiesPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done); 
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });

    setup((done) => {
        db.clearTestData(done);
    });
        
    test('Log Party Activities', (done) => {
        fixture.testLogPartyActivities(done);
    });

    test('Get Party Activities', (done) => {
        fixture.testGetPartyActivities(done);
    });
});