let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { ActivitiesLambdaFunction } from '../../src/run/ActivitiesLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});

suite('ActivitiesLambdaFunction', ()=> {    
    let lambda = new ActivitiesLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        // done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_party_activities',
                filter: {
                    party_id: '2'
                } 
            },
            {
                done: (err, activities) => {
                    assert.isNull(err);

                    assert.isObject(activities);
                                    
                    done();
                }
            }
        );
    });
});