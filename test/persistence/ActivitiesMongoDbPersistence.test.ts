import { YamlConfigReader } from 'pip-services-commons-node';

import { ActivitiesMongoDbPersistence } from '../../src/persistence/ActivitiesMongoDbPersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesMongoDbPersistence', ()=> {
    let persistence: ActivitiesMongoDbPersistence;
    let fixture: ActivitiesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml');
        let dbConfig = config.getSection('mongodb');

        persistence = new ActivitiesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new ActivitiesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('Log Party Activities', (done) => {
        fixture.testLogPartyActivities(done);
    });

    test('Get Party Activities', (done) => {
        fixture.testGetPartyActivities(done);
    });
    
});