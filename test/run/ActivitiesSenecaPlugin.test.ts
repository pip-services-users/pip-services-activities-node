let _ = require('lodash');
let assert = require('chai').assert;

import { ActivitiesSenecaPlugin } from '../../src/run/ActivitiesSenecaPlugin';

let buildConfig = {
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
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};

suite('ActivitiesSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new ActivitiesSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'activities',
                cmd: 'get_party_activities',
                filter: {
                    party_id: '2'
                } 
            },
            (err, activities) => {
                assert.isNull(err);

                assert.isObject(activities);

                done();
            }
        );
    });
});