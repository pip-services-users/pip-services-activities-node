import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { ActivitiesMemoryPersistence } from '../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesMemoryPersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new ActivitiesMemoryPersistence();
        db.configure(new ComponentConfig());

        fixture = new ActivitiesPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('Log Party Activities', (done) => {
        fixture.testLogPartyActivities(done);
    });

    test('Get Party Activities', (done) => {
        fixture.testGetPartyActivities(done);
    });
});