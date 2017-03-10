import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { ActivitiesMongoDbPersistence } from '../../src/persistence/ActivitiesMongoDbPersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('ActivitiesMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new ActivitiesMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new ActivitiesPersistenceFixture(db);

    suiteSetup((done) => {
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